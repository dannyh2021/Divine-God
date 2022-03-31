const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start
    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))

    let rank = bot.rpg.get(message.author.id).rank
    
    if (rank == "D"){
        xpAmount = 150
        boxAmount = 1
    }

    if (rank == "C"){
        xpAmount = 500
        boxAmount = 2
    }

    if (rank == "B"){
        xpAmount = 1000
        boxAmount = 3
    }

    if (rank == "A"){
        xpAmount = 2000
        boxAmount = 4
    }
    
    if (rank == "S"){
        xpAmount = 3000
        boxAmount = 5
    }

    bot.rpg.add(`${message.author.id}.experience`, xpAmount)
    bot.rpg.add(`${message.author.id}.mysterybox`, boxAmount)
    message.channel.send(bot.embed(`${bot.set.shuriken} You have done your daily training as a shinobi and earned **${xpAmount}** experience!\n📦 You have also claimed **${boxAmount}** mystery box!`, message.author))
}

module.exports.config = 
{
    desc: "Claim your daily experience for your shinobi.",
    command: "shinobidaily",
    aliases: ["sdaily"],
    category: "shinobi",
    cooldown: 24 * 3600
}