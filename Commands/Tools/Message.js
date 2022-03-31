const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports.run = async (bot, message, args) => 
{
    if (!args[0]){
        let messages = bot.eco.get(message.author.id).messages
    
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setAuthor(`Server Messages`, message.author.avatarURL({dynamic: true}))
            .setDescription(`💬 You have **${messages.toLocaleString()}** messages!`)
    
        return message.channel.send(embed)

    }

    let member = message.mentions.members.first()

    if (member){
        let messages = bot.eco.get(member.id).messages
    
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setAuthor(`Server Messages`, member.user.avatarURL({dynamic: true}))
            .setDescription(`💬 ${member} has **${messages.toLocaleString()}** messages!`)
    
        return message.channel.send(embed)
    }

    if (args[0].toLowerCase() == 'leaderboard' || args[0].toLowerCase() == 'lb'){
        let msg = await message.channel.send(`${bot.set.typing}`)
        let member = message.member
        let value = bot.eco.all().map(db => {
        let data
        try{
            data = JSON.parse(db.data);
        } 
        catch{
            data = db.data
        }
        let user = bot.users.resolve(db.ID);
        if (!user)
            return
        return {
            tag: user.username,
            value: data.messages || 0
        }
        }).filter(o => o)
        value.sort((a, b) => b.value - a.value)

        let me = value.findIndex(o => o.tag == message.author.username)

        trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

        if (args[1]){
            if (args[1] == '2'){
                rank1 = trimString(String(value.map((o, i) => `#11  ${o.tag}`).splice(10, 1)), 22)
                rank2 = trimString(String(value.map((o, i) => `#12  ${o.tag}\n`).splice(11, 1)), 22)
                rank3 = trimString(String(value.map((o, i) => `#13  ${o.tag}\n`).splice(12, 1)), 22)
                rank4 = trimString(String(value.map((o, i) => `#14  ${o.tag}\n`).splice(13, 1)), 22)
                rank5 = trimString(String(value.map((o, i) => `#15  ${o.tag}\n`).splice(14, 1)), 22)
                rank6 = trimString(String(value.map((o, i) => `#16  ${o.tag}\n`).splice(15, 1)), 22)
                rank7 = trimString(String(value.map((o, i) => `#17  ${o.tag}\n`).splice(16, 1)), 22)
                rank8 = trimString(String(value.map((o, i) => `#18  ${o.tag}\n`).splice(17, 1)), 22)
                rank9 = trimString(String(value.map((o, i) => `#19  ${o.tag}\n`).splice(18, 1)), 22)
                rank10 = trimString(String(value.map((o, i) => `  #20  ${o.tag}\n`).splice(19, 1)), 22)
                value1 = parseInt(value.map((o, i) => `${o.value}\n`).splice(10, 1)).toLocaleString()
                value2 = parseInt(value.map((o, i) => `${o.value}\n`).splice(11, 1)).toLocaleString()
                value3 = parseInt(value.map((o, i) => `${o.value}\n`).splice(12, 1)).toLocaleString()
                value4 = parseInt(value.map((o, i) => `${o.value}\n`).splice(13, 1)).toLocaleString()
                value5 = parseInt(value.map((o, i) => `${o.value}\n`).splice(14, 1)).toLocaleString()
                value6 = parseInt(value.map((o, i) => `${o.value}\n`).splice(15, 1)).toLocaleString()
                value7 = parseInt(value.map((o, i) => `${o.value}\n`).splice(16, 1)).toLocaleString()
                value8 = parseInt(value.map((o, i) => `${o.value}\n`).splice(17, 1)).toLocaleString()
                value9 = parseInt(value.map((o, i) => `${o.value}\n`).splice(18, 1)).toLocaleString()
                value10 = parseInt(value.map((o, i) => `${o.value}\n`).splice(19, 1)).toLocaleString()
                footerText = 'Type $message lb 3 to go to page 3 of the leaderboard!'
            }
            else if (args[1] == '3'){
                rank1 = trimString(String(value.map((o, i) => `#21  ${o.tag}`).splice(20, 1)), 22)
                rank2 = trimString(String(value.map((o, i) => `#22  ${o.tag}\n`).splice(21, 1)), 22)
                rank3 = trimString(String(value.map((o, i) => `#23  ${o.tag}\n`).splice(22, 1)), 22)
                rank4 = trimString(String(value.map((o, i) => `#24  ${o.tag}\n`).splice(23, 1)), 22)
                rank5 = trimString(String(value.map((o, i) => `#25  ${o.tag}\n`).splice(24, 1)), 22)
                rank6 = trimString(String(value.map((o, i) => `#26  ${o.tag}\n`).splice(25, 1)), 22)
                rank7 = trimString(String(value.map((o, i) => `#27  ${o.tag}\n`).splice(26, 1)), 22)
                rank8 = trimString(String(value.map((o, i) => `#28  ${o.tag}\n`).splice(27, 1)), 22)
                rank9 = trimString(String(value.map((o, i) => `#29  ${o.tag}\n`).splice(28, 1)), 22)
                rank10 = trimString(String(value.map((o, i) => `  #30  ${o.tag}\n`).splice(29, 1)), 22)
                value1 = parseInt(value.map((o, i) => `${o.value}\n`).splice(20, 1)).toLocaleString()
                value2 = parseInt(value.map((o, i) => `${o.value}\n`).splice(21, 1)).toLocaleString()
                value3 = parseInt(value.map((o, i) => `${o.value}\n`).splice(22, 1)).toLocaleString()
                value4 = parseInt(value.map((o, i) => `${o.value}\n`).splice(23, 1)).toLocaleString()
                value5 = parseInt(value.map((o, i) => `${o.value}\n`).splice(24, 1)).toLocaleString()
                value6 = parseInt(value.map((o, i) => `${o.value}\n`).splice(25, 1)).toLocaleString()
                value7 = parseInt(value.map((o, i) => `${o.value}\n`).splice(26, 1)).toLocaleString()
                value8 = parseInt(value.map((o, i) => `${o.value}\n`).splice(27, 1)).toLocaleString()
                value9 = parseInt(value.map((o, i) => `${o.value}\n`).splice(28, 1)).toLocaleString()
                value10 = parseInt(value.map((o, i) => `${o.value}\n`).splice(29, 1)).toLocaleString()
                footerText = 'Type $message lb 4 to go to page 1 of the leaderboard!'
            }
            else if (args[1] == '4'){
                rank1 = trimString(String(value.map((o, i) => `#31  ${o.tag}`).splice(30, 1)), 22)
                rank2 = trimString(String(value.map((o, i) => `#32  ${o.tag}\n`).splice(31, 1)), 22)
                rank3 = trimString(String(value.map((o, i) => `#33  ${o.tag}\n`).splice(32, 1)), 22)
                rank4 = trimString(String(value.map((o, i) => `#34  ${o.tag}\n`).splice(33, 1)), 22)
                rank5 = trimString(String(value.map((o, i) => `#35  ${o.tag}\n`).splice(34, 1)), 22)
                rank6 = trimString(String(value.map((o, i) => `#36  ${o.tag}\n`).splice(35, 1)), 22)
                rank7 = trimString(String(value.map((o, i) => `#37  ${o.tag}\n`).splice(36, 1)), 22)
                rank8 = trimString(String(value.map((o, i) => `#38  ${o.tag}\n`).splice(37, 1)), 22)
                rank9 = trimString(String(value.map((o, i) => `#39  ${o.tag}\n`).splice(38, 1)), 22)
                rank10 = trimString(String(value.map((o, i) => `  #40  ${o.tag}\n`).splice(39, 1)), 22)
                value1 = parseInt(value.map((o, i) => `${o.value}\n`).splice(30, 1)).toLocaleString()
                value2 = parseInt(value.map((o, i) => `${o.value}\n`).splice(31, 1)).toLocaleString()
                value3 = parseInt(value.map((o, i) => `${o.value}\n`).splice(32, 1)).toLocaleString()
                value4 = parseInt(value.map((o, i) => `${o.value}\n`).splice(33, 1)).toLocaleString()
                value5 = parseInt(value.map((o, i) => `${o.value}\n`).splice(34, 1)).toLocaleString()
                value6 = parseInt(value.map((o, i) => `${o.value}\n`).splice(35, 1)).toLocaleString()
                value7 = parseInt(value.map((o, i) => `${o.value}\n`).splice(36, 1)).toLocaleString()
                value8 = parseInt(value.map((o, i) => `${o.value}\n`).splice(37, 1)).toLocaleString()
                value9 = parseInt(value.map((o, i) => `${o.value}\n`).splice(38, 1)).toLocaleString()
                value10 = parseInt(value.map((o, i) => `${o.value}\n`).splice(39, 1)).toLocaleString()
                footerText = 'Type $message lb 1 to go to page 1 of the leaderboard!'
            }
            else{
                rank1 = trimString(String(value.map((o, i) => `#1  ${o.tag}`).splice(0, 1)), 22)
                rank2 = trimString(String(value.map((o, i) => `#2  ${o.tag}\n`).splice(1, 1)), 22)
                rank3 = trimString(String(value.map((o, i) => `#3  ${o.tag}\n`).splice(2, 1)), 22)
                rank4 = trimString(String(value.map((o, i) => `#4  ${o.tag}\n`).splice(3, 1)), 22)
                rank5 = trimString(String(value.map((o, i) => `#5  ${o.tag}\n`).splice(4, 1)), 22)
                rank6 = trimString(String(value.map((o, i) => `#6  ${o.tag}\n`).splice(5, 1)), 22)
                rank7 = trimString(String(value.map((o, i) => `#7  ${o.tag}\n`).splice(6, 1)), 22)
                rank8 = trimString(String(value.map((o, i) => `#8  ${o.tag}\n`).splice(7, 1)), 22)
                rank9 = trimString(String(value.map((o, i) => `#9  ${o.tag}\n`).splice(8, 1)), 22)
                rank10 = trimString(String(value.map((o, i) => `#10  ${o.tag}\n`).splice(9, 1)), 22)
                value1 = parseInt(value.map((o, i) => `${o.value}\n`).splice(0, 1)).toLocaleString()
                value2 = parseInt(value.map((o, i) => `${o.value}\n`).splice(1, 1)).toLocaleString()
                value3 = parseInt(value.map((o, i) => `${o.value}\n`).splice(2, 1)).toLocaleString()
                value4 = parseInt(value.map((o, i) => `${o.value}\n`).splice(3, 1)).toLocaleString()
                value5 = parseInt(value.map((o, i) => `${o.value}\n`).splice(4, 1)).toLocaleString()
                value6 = parseInt(value.map((o, i) => `${o.value}\n`).splice(5, 1)).toLocaleString()
                value7 = parseInt(value.map((o, i) => `${o.value}\n`).splice(6, 1)).toLocaleString()
                value8 = parseInt(value.map((o, i) => `${o.value}\n`).splice(7, 1)).toLocaleString()
                value9 = parseInt(value.map((o, i) => `${o.value}\n`).splice(8, 1)).toLocaleString()
                value10 = parseInt(value.map((o, i) => `${o.value}\n`).splice(9, 1)).toLocaleString()
                footerText = 'Type $message lb 2 to go to page 2 of the leaderboard!'
            }
        }
        else{
            rank1 = trimString(String(value.map((o, i) => `#1  ${o.tag}`).splice(0, 1)), 22)
            rank2 = trimString(String(value.map((o, i) => `#2  ${o.tag}\n`).splice(1, 1)), 22)
            rank3 = trimString(String(value.map((o, i) => `#3  ${o.tag}\n`).splice(2, 1)), 22)
            rank4 = trimString(String(value.map((o, i) => `#4  ${o.tag}\n`).splice(3, 1)), 22)
            rank5 = trimString(String(value.map((o, i) => `#5  ${o.tag}\n`).splice(4, 1)), 22)
            rank6 = trimString(String(value.map((o, i) => `#6  ${o.tag}\n`).splice(5, 1)), 22)
            rank7 = trimString(String(value.map((o, i) => `#7  ${o.tag}\n`).splice(6, 1)), 22)
            rank8 = trimString(String(value.map((o, i) => `#8  ${o.tag}\n`).splice(7, 1)), 22)
            rank9 = trimString(String(value.map((o, i) => `#9  ${o.tag}\n`).splice(8, 1)), 22)
            rank10 = trimString(String(value.map((o, i) => `#10  ${o.tag}\n`).splice(9, 1)), 22)
            value1 = parseInt(value.map((o, i) => `${o.value}\n`).splice(0, 1)).toLocaleString()
            value2 = parseInt(value.map((o, i) => `${o.value}\n`).splice(1, 1)).toLocaleString()
            value3 = parseInt(value.map((o, i) => `${o.value}\n`).splice(2, 1)).toLocaleString()
            value4 = parseInt(value.map((o, i) => `${o.value}\n`).splice(3, 1)).toLocaleString()
            value5 = parseInt(value.map((o, i) => `${o.value}\n`).splice(4, 1)).toLocaleString()
            value6 = parseInt(value.map((o, i) => `${o.value}\n`).splice(5, 1)).toLocaleString()
            value7 = parseInt(value.map((o, i) => `${o.value}\n`).splice(6, 1)).toLocaleString()
            value8 = parseInt(value.map((o, i) => `${o.value}\n`).splice(7, 1)).toLocaleString()
            value9 = parseInt(value.map((o, i) => `${o.value}\n`).splice(8, 1)).toLocaleString()
            value10 = parseInt(value.map((o, i) => `${o.value}\n`).splice(9, 1)).toLocaleString()
            footerText = 'Type $message lb 2 to go to page 2 of the leaderboard!'
        }

        const canvas = Canvas.createCanvas(720, 730)
        const ctx = canvas.getContext('2d')

        const background = await Canvas.loadImage('https://i.ibb.co/McXD5h5/Leaderboard-Template.png')
        const symbol = await Canvas.loadImage('https://i.ibb.co/KxCM9yf/Chat.png')
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

        ctx.drawImage(symbol, 450, 12, 40, 40)
        ctx.drawImage(symbol, 450, 87, 40, 40)
        ctx.drawImage(symbol, 450, 160, 40, 40)
        ctx.drawImage(symbol, 450, 234, 40, 40)
        ctx.drawImage(symbol, 450, 308, 40, 40)
        ctx.drawImage(symbol, 450, 382, 40, 40)
        ctx.drawImage(symbol, 450, 456, 40, 40)
        ctx.drawImage(symbol, 450, 530, 40, 40)
        ctx.drawImage(symbol, 450, 605, 40, 40)
        ctx.drawImage(symbol, 450, 677, 40, 40)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "messageleaderboard.png")
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setTitle('Message Leaderboard')
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setDescription(`💬 Messages: **${value[me].value.toLocaleString()}**\n🏅 Rank: **${me + 1}**`)
            .attachFiles(attachment)
            .setImage('attachment://messageleaderboard.png')
            .setFooter(footerText)

        msg.delete()
        return message.channel.send(embed)
    }

}

module.exports.config = 
{
    desc: "Check how many messages you have in the server. (approximate)",
    usage: "<leaderbaord>",
    command: "message",
    aliases: ["msg"],
    category: "tools",
}