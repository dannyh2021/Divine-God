const Discord = require('discord.js')
const Canvas  = require ('canvas')

module.exports = async(bot, member) => 
{
    if(member.user.bot)
        return

    if(!bot.eco.has(member.id)){

        bot.eco.set(`${member.id}.balance`, 0)
        bot.eco.set(`${member.id}.bank`, 0)
        bot.eco.set(`${member.id}.game`, 0)
        bot.eco.set(`${member.id}.gamecount`, 0)
        bot.eco.set(`${member.id}.drop`, 0)
        bot.eco.set(`${member.id}.messages`, 0)
        bot.eco.set(`${member.id}.points`, 0)

        bot.eco.set(`${member.id}.warn`, 0)
        bot.eco.set(`${member.id}.mutetime`, 0)

        bot.eco.set(`${member.id}.start`, 0)

        bot.eco.set(`${member.id}.balancebackground`, "None")
        bot.eco.set(`${member.id}.balanceinventory`, [])

        bot.rpg.set(`${member.id}.experience`, 0)
        bot.rpg.set(`${member.id}.level`, 1)
        bot.rpg.set(`${member.id}.health`, 100)
        bot.rpg.set(`${member.id}.power`, 25)
        bot.rpg.set(`${member.id}.rank`, "D")
        bot.rpg.set(`${member.id}.train`, 0)
        bot.rpg.set(`${member.id}.drank`, 0)
        bot.rpg.set(`${member.id}.crank`, 0)
        bot.rpg.set(`${member.id}.brank`, 0)
        bot.rpg.set(`${member.id}.arank`, 0)
        bot.rpg.set(`${member.id}.srank`, 0)
        bot.rpg.set(`${member.id}.ssrank`, 0)
        bot.rpg.set(`${member.id}.defeatedenemies`, [])
        bot.rpg.set(`${member.id}.mysterybox`, 0)
        bot.rpg.set(`${member.id}.critical`, 10)
        bot.rpg.set(`${member.id}.missionstatus`, "off")
        bot.rpg.set(`${member.id}.weaponinventory`, [])
        bot.rpg.set(`${member.id}.weapon`, "None")
    }

    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '✨『welcome』')

    let memberCount = welcomeChannel.guild.members.cache.filter(member => !member.user.bot).size
    let dateVal = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    const canvas = Canvas.createCanvas(1000, 500)
    const ctx = canvas.getContext('2d')

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }))
    const wallpaper = await Canvas.loadImage('https://i.ibb.co/sWB32Kw/Welcome-Wallpaper-1.png')
    const background = await Canvas.loadImage('https://i.ibb.co/qRX4Qd1/Banner-Welcome.png')



    ctx.drawImage(wallpaper, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(avatar, 390 , 39, 235, 235)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    function drawStroked1(text, x, y) 
    {   
        ctx.font = 'bold 56px Arial'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8
        ctx.strokeText(text, x, y)
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
    }
    drawStroked1(`WELCOME!`, 365, 350)
    drawStroked1(`YOU ARE MEMBER #${memberCount}`, 175, 440)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    const welcomeEmbed = new Discord.MessageEmbed()
        .attachFiles(attachment)
        .setTitle(`Welcome to Shinobi Ground!`)
        .setDescription(`
Check the following channels to get started! 

‣ <#815376864486752317> - general rules
‣ <#815376983616913409> - general information
‣ <#815374974453284884> - main channel to chat
‣ <#954358378707156993> - play our custom Naruto Bot games here

Enjoy your stay at Shinobi Ground!
        `)
        .setColor("00e3ff")
        .setImage('attachment://welcome.png')
        .setFooter(`Joined: ${dateVal}, ${time}`)

    welcomeChannel.send(`${member}`, {embed: welcomeEmbed})
}