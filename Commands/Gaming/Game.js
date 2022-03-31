const Discord = require('discord.js')
const {titleCase} = require('../../Util/utils')
const {formatTime} = require('../../Util/utils.js')
const collectors = new Discord.Collection()
const Canvas = require('canvas')

module.exports.run = async (bot, message, args) => 
{
    if (!args[0]){
        let member = message.member
        let gamecount = bot.eco.get(message.author.id).gamecount

        if (collectors.has(message.author.id))
            return message.channel.send(`${member}, you already have an active game!`).then(msg => msg.delete({timeout: 3000}))

        const now = Date.now()
        const timestamps = bot.cooldowns.get(`Game`)
        const cooldownAmount = 1000 * 3600 * 12
        const expDate = timestamps[message.author.id] + cooldownAmount
        const timeLeft = expDate - now

        if (message.author.id in timestamps){
            if (now < expDate)
                return message.channel.send(bot.failEmbed(`⏲ You can play games again in **${formatTime(timeLeft)}**`, message.author))
            if (now > expDate && gamecount == 50){
                bot.cooldowns.delete(`Game.${message.author.id}`)
                bot.eco.set(`${message.author.id}.gamecount`, 0)
            }
        }

        if (gamecount == 49)
            bot.cooldowns.set(`Game.${message.author.id}`, now)

        if (gamecount == 50)
            bot.eco.set(`${message.author.id}.gamecount`, 0)

        bot.eco.add(`${message.author.id}.gamecount`, 1)

        let newgamecount = bot.eco.get(message.author.id).gamecount
        let gamesRemaining = 50 - newgamecount

        let data = bot.set.game.data
        let randCharacter = data[Math.floor(Math.random() * data.length)]



        const gameEmbed = new Discord.MessageEmbed()
            .setAuthor(`Game`, message.author.avatarURL({dynamic: true}))
            .setDescription(`Guess the character!`)
            .setImage(randCharacter.image)
            .setColor('#00e3ff')
            .setFooter(`You can end the game by typing end.`)
    
        let msg = await message.channel.send(gameEmbed)

        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, {max: 100, time: 10000000})
        collectors.set(message.author.id, {collector: collector, answer: randCharacter.answers[0]})

        let tries = 3;
        let winAmount = Math.floor(Math.random() * 16 + 15)
        collector.on('collect', m => {
    
            if (m.content.toLowerCase() == '$end' || m.content.toLowerCase() == 'end'){
                collector.stop()
                collectors.delete(message.author.id)
                gameEmbed.setImage(null)
                gameEmbed.setColor('RED')
                gameEmbed.setThumbnail(randCharacter.image)
                gameEmbed.setDescription(`❌ **Game Ended**\n\n**Possible Answers:**\n• ${titleCase(randCharacter.answers.join(' \n• '))}`)
                gameEmbed.setFooter(`Games Remaining: ${gamesRemaining}`)
    
            } 
            else if (randCharacter.answers.includes(m.content.toLowerCase())){
                collector.stop()
                collectors.delete(message.author.id);
                gameEmbed.setImage('')
                gameEmbed.setColor('00e3ff')
                gameEmbed.setThumbnail(randCharacter.image)
                gameEmbed.setDescription(`${bot.set.check} **Correct!** You won **${winAmount}** ryo!\n\n**Possible Answers:**\n• ${titleCase(randCharacter.answers.join(' \n• '))}\n\n`)
                gameEmbed.setFooter(`Games Remaining: ${gamesRemaining}`)
                bot.eco.add(`${message.author.id}.balance`, winAmount)
                bot.eco.add(`${message.author.id}.game`, 1)
            } 
            else{
                tries--
                if (tries == 0){
                    collector.stop()
                    gameEmbed.setImage('')
                    gameEmbed.setColor('RED')
                    gameEmbed.setThumbnail(randCharacter.image)
                    gameEmbed.setDescription(`❌ **Incorrect!**\n\n**Possible Answers:**\n• ${titleCase(randCharacter.answers.join(' \n• '))}`)
                    gameEmbed.setFooter(`Games Remaining: ${gamesRemaining}`)
                }
                else{
                gameEmbed.setColor('RED')
                gameEmbed.setDescription(`❌ **Incorrect!** You have **${tries}** tries remaining!`)
                if (tries == 1)
                    gameEmbed.setDescription(`❌ **Incorrect!** You have **1** try remaining!`)
                }
            }
            msg.edit(gameEmbed)
        })
        collector.on('end', c => collectors.delete(message.author.id))
        return
    }

    if (args[0].toLowerCase() == 'wins'){
        let game = bot.eco.get(message.author.id).game
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setAuthor(`Game Wins`, message.author.avatarURL({dynamic: true}))
            .setDescription(`🕹 You have **${game}** game wins!`)

        return message.channel.send(embed)
    }

    if (args[0].toLowerCase() == 'leaderboard' || args[0].toLowerCase() == 'lb'){
        let msg = await message.channel.send(`${bot.set.typing}`)
        let member = message.member
        let value = bot.eco.all().map(db => {
        let data
        try {
            data = JSON.parse(db.data);
        } catch {
            data = db.data
        }
        let user = bot.users.resolve(db.ID);
        if (!user)
            return
        return {
            tag: user.username,
            value: data.game || 0
        }
        }).filter(o => o)
        value.sort((a, b) => b.value - a.value)

        let me = value.findIndex(o => o.tag == message.author.username)

        trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

        let rank1 = trimString(String(value.map((o, i) => `#1  ${o.tag}`).splice(0, 1)), 22)
        let rank2 = trimString(String(value.map((o, i) => `#2  ${o.tag}\n`).splice(1, 1)), 22)
        let rank3 = trimString(String(value.map((o, i) => `#3  ${o.tag}\n`).splice(2, 1)), 22)
        let rank4 = trimString(String(value.map((o, i) => `#4  ${o.tag}\n`).splice(3, 1)), 22)
        let rank5 = trimString(String(value.map((o, i) => `#5  ${o.tag}\n`).splice(4, 1)), 22)
        let rank6 = trimString(String(value.map((o, i) => `#6  ${o.tag}\n`).splice(5, 1)), 22)
        let rank7 = trimString(String(value.map((o, i) => `#7  ${o.tag}\n`).splice(6, 1)), 22)
        let rank8 = trimString(String(value.map((o, i) => `#8  ${o.tag}\n`).splice(7, 1)), 22)
        let rank9 = trimString(String(value.map((o, i) => `#9  ${o.tag}\n`).splice(8, 1)), 22)
        let rank10 = trimString(String(value.map((o, i) => `#10  ${o.tag}\n`).splice(9, 1)), 22)
        let value1 = parseInt(value.map((o, i) => `${o.value}\n`).splice(0, 1)).toLocaleString()
        let value2 = parseInt(value.map((o, i) => `${o.value}\n`).splice(1, 1)).toLocaleString()
        let value3 = parseInt(value.map((o, i) => `${o.value}\n`).splice(2, 1)).toLocaleString()
        let value4 = parseInt(value.map((o, i) => `${o.value}\n`).splice(3, 1)).toLocaleString()
        let value5 = parseInt(value.map((o, i) => `${o.value}\n`).splice(4, 1)).toLocaleString()
        let value6 = parseInt(value.map((o, i) => `${o.value}\n`).splice(5, 1)).toLocaleString()
        let value7 = parseInt(value.map((o, i) => `${o.value}\n`).splice(6, 1)).toLocaleString()
        let value8 = parseInt(value.map((o, i) => `${o.value}\n`).splice(7, 1)).toLocaleString()
        let value9 = parseInt(value.map((o, i) => `${o.value}\n`).splice(8, 1)).toLocaleString()
        let value10 = parseInt(value.map((o, i) => `${o.value}\n`).splice(9, 1)).toLocaleString()

        const canvas = Canvas.createCanvas(720, 730)
        const ctx = canvas.getContext('2d')

        const background = await Canvas.loadImage('https://i.ibb.co/McXD5h5/Leaderboard-Template.png')
        const symbol = await Canvas.loadImage('https://i.ibb.co/Rj1xymJ/Game.png')
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'png'}))

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(avatar, 200, 1385, 100, 100)

        function drawStroked1(text, x, y) {
            ctx.font = 'bold 30px Arial'
            ctx.fillStyle = 'white'
            ctx.fillText(text, x, y)
        }
        drawStroked1(rank1, 67, 43)
        drawStroked1(rank2, 67, 118)
        drawStroked1(rank3, 67, 191)
        drawStroked1(rank4, 67, 265)
        drawStroked1(rank5, 67, 339)
        drawStroked1(rank6, 67, 413)
        drawStroked1(rank7, 67, 487)
        drawStroked1(rank8, 67, 561)
        drawStroked1(rank9, 67, 636)
        drawStroked1(rank10, 50, 709)
        drawStroked1(value1, 525, 43)
        drawStroked1(value2, 525, 118)
        drawStroked1(value3, 525, 191)
        drawStroked1(value4, 525, 265)
        drawStroked1(value5, 525, 339)
        drawStroked1(value6, 525, 413)
        drawStroked1(value7, 525, 487)
        drawStroked1(value8, 525, 561)
        drawStroked1(value9, 525, 636)
        drawStroked1(value10, 525, 709)

        ctx.drawImage(symbol, 450, 10, 40, 40)
        ctx.drawImage(symbol, 450, 85, 40, 40)
        ctx.drawImage(symbol, 450, 158, 40, 40)
        ctx.drawImage(symbol, 450, 232, 40, 40)
        ctx.drawImage(symbol, 450, 306, 40, 40)
        ctx.drawImage(symbol, 450, 380, 40, 40)
        ctx.drawImage(symbol, 450, 454, 40, 40)
        ctx.drawImage(symbol, 450, 528, 40, 40)
        ctx.drawImage(symbol, 450, 603, 40, 40)
        ctx.drawImage(symbol, 450, 666, 40, 40)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "gameleaderboard.png")
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setTitle('Game Leaderboard')
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setDescription(`🕹 Game Wins: **${value[me].value.toLocaleString()}**\n🏅 Rank: **${me + 1}**`)
            .attachFiles(attachment)
            .setImage('attachment://gameleaderboard.png')
            .setFooter(message.author.tag, message.author.avatarURL())

        msg.delete()
        return message.channel.send(embed)
        }
}

module.exports.config = 
{
    desc: "Play a Naruto character guessing game.\nRules:\n\n• You get to play **50** games every **12 hours**.\n• You get **3** tries per game.\n• You earn **15-30** ryo per game.",
    command: "game",
    category: "gaming",
}