const Discord = require('discord.js')
const Canvas  = require ('canvas')

module.exports.run = async (bot, message, args) => 
{
    if (!args[0])
        return

    if (args[0].toLowerCase() == 'wins'){
        let drop = bot.eco.get(message.author.id).drop
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setAuthor(`Claim Wins`, message.author.avatarURL({dynamic: true}))
            .setDescription(`${bot.set.star} You have **${drop}** claim wins!`)

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
                value: data.drop || 0
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
        const symbol = await Canvas.loadImage('https://i.ibb.co/JR9zZmF/Star.png')
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
    
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "claimleaderboard.png")
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setTitle('Claim Wins Leaderboard')
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setDescription(`${bot.set.star} Claim Wins: **${value[me].value.toLocaleString()}**\n🏅 Rank: **${me + 1}**`)
            .attachFiles(attachment)
            .setImage('attachment://claimleaderboard.png')
            .setFooter(message.author.tag, message.author.avatarURL())
    
        msg.delete()
        return message.channel.send(embed)
    }

    let code = args[0]
    let chatCode = bot.drops.get(`${message.channel.id}_code`) || null
    let ch = message.channel.id
    let chIndex = bot.set.drops.channels.findIndex(ch => ch.id == message.channel.id)

    if(chatCode == null)
        return
    
    if (!args[0])
        return

    if(code.toLowerCase() == chatCode){

        if (ch == 815374974453284884 || ch == 815376745930031135 || ch == 954192595028947045)
            amount = Math.floor(Math.random() * 151 + 150) 
        else
            amount = Math.floor(Math.random() * 101 + 50)

        bot.drops.delete(`${message.channel.id}_code`)
        bot.eco.add(`${message.author.id}.balance`, amount)
        bot.eco.add(`${message.author.id}.drop`, 1)


        message.channel.send(`${message.author}`, {embed: bot.embed(`${bot.set.star} You have claimed the drop containing **${amount}** ryo!`)})

        if(chIndex == -1)
            bot.drops.set(ch, bot.set.drops.dropRate);
        else
            bot.drops.set(ch, bot.set.drops.channels[chIndex].dropRate)
    }
}

module.exports.config = 
{
    desc: "Claim a ryo drop or check your claim wins or claim leaderboard.",
    usage: "<code | wins | lb>",
    command: "claim",
    category: "gaming"
}