const Discord = require('discord.js')
const Canvas  = require ('canvas')

module.exports.run = async (bot, message, args) => 
{
    let member = message.mentions.members.first() || message.member

    if (member.user.bot)
        return
        
    let data = bot.eco.get(member.id)
    let balance = data.balance
    let bank = data.bank
    let balancebackground = data.balancebackground
    let shop = bot.set.shop

    let msg = await message.channel.send(`${bot.set.typing}`)
    
    if (shop.balanceWallpaper.some(item => item.name === balancebackground)){
        number = shop.balanceWallpaper.findIndex(item => item.name === balancebackground)
        wallpaper = shop.balanceWallpaper[number].link
    }
    else
        wallpaper = 'https://i.ibb.co/KLLT4qv/Balance-Wallpaper-Default.png'

    const canvas = Canvas.createCanvas(2250, 1080)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(wallpaper)
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }))

    const balanceImage = await Canvas.loadImage('https://i.ibb.co/W31CNsz/Ryo.png')
    const bankImage = await Canvas.loadImage('https://i.ibb.co/23792pz/Frog.png')

    ctx.drawImage(background, 0, 0, 1800, 1080)
    ctx.drawImage(balanceImage, 150, 320, 180, 180)
    ctx.drawImage(bankImage, 160, 600, 160, 160)

    function drawStroked1(text, x, y){   
        ctx.font = 'bold 110px Arial'
        ctx.lineWidth = 15
        ctx.fillStyle = 'white'
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
    }

    function drawStroked2(text, x, y){   
        ctx.font = 'bold 150px Arial'
        ctx.lineWidth = 15
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'white'
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
    }
    
    function drawStroked3(text, x, y){   
        ctx.font = 'bold 80px Arial'
        ctx.lineWidth = 10
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'white'
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
    }

    drawStroked1(`Cash: ${balance.toLocaleString()}`, 375, 450)
    drawStroked1(`Bank: ${bank.toLocaleString()}`, 375, 730)
    drawStroked2(`Balance`, 625, 200)
    drawStroked3(`${member.user.tag}`, 470, 1025)
    
    ctx.beginPath() 
    ctx.arc(350, 970, 75, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 275, 895, 150, 150)

    

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "balance.png")
    msg.delete()
    message.channel.send(`>>> 💳 **Viewing Balance • [${member.user.tag}]**`, {files: [attachment]})
}

module.exports.config = 
{
    desc: "Displays yours or another user's balance and bank.",
    usage: "<@user>",
    command: "balance",
    aliases: ["bal"],
    category: "economy",
}