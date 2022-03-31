const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start
    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))
        
    let xpAmount = Math.floor(Math.random() * 51 + 50)
    let ryoAmount = Math.floor(Math.random() * 51 + 50)

    let textList = [
        "You cleaned the Hokage's Office.",
        "You weeded a local garden.",
        "You rescued a cat from a tree.",
        "You cleaned a graffiti off a statue.",
        "You did some babysitting.",
        "You washed some windows.",
        "You walked a dog."
]

    let randomText = textList[Math.floor(Math.random() * textList.length)]
    
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .setColor('00e3ff')
        .setThumbnail(`https://i.ibb.co/Csv4YQd/Scroll.png`)
        .setDescription(`You are working on a **D Rank Mission** right now. ${bot.set.typing}`)

    let msg = await message.channel.send(embed)
    await bot.sleep(5000)

    embed.setDescription(`${randomText}\nYou earned:\n• **${xpAmount}** experience\n• **${ryoAmount}** ryo`)
    msg.edit(embed)
    bot.rpg.add(`${message.author.id}.drank`, 1)
    bot.rpg.add(`${message.author.id}.experience`, xpAmount)
    bot.eco.add(`${message.author.id}.balance`, ryoAmount)
}

module.exports.config = 
{
    desc: "Go on a D Rank Mission with your Shinobi",
    command: "drank",
    category: "shinobi",
    cooldown: 900
}