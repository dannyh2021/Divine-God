const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start

    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))

    let rank = bot.rpg.get(message.author.id).rank

    if (rank == "D")
        xpAmount = Math.floor(Math.random() * 6 + 5)
    if (rank == "C")
        xpAmount = Math.floor(Math.random() * 6 + 10)
    if (rank == "B")
        xpAmount = Math.floor(Math.random() * 11 + 15)
    if (rank == "A")
        xpAmount = Math.floor(Math.random() * 11 + 25)
    if (rank == "S")
        xpAmount = Math.floor(Math.random() * 16 + 35)

    let roll = Math.floor(Math.random() * 10)
    if (roll == 0){
        xpAmount = xpAmount * 5
        bot.rpg.add(`${message.author.id}.experience`, xpAmount)
        bot.rpg.add(`${message.author.id}.train`, 1)
        return message.channel.send(bot.embed(`${bot.set.shuriken} You have perfected a technique while training and earned **${xpAmount}** experience!`, message.author))
    }

    bot.rpg.add(`${message.author.id}.experience`, xpAmount)
    bot.rpg.add(`${message.author.id}.train`, 1)
    return message.channel.send(bot.embed(`${bot.set.shuriken} You have trained yourself as a shinobi and earned **${xpAmount}** experience!`, message.author))
}

module.exports.config = 
{
    desc: "Train yourself as a shinobi.",
    command: "train",
    category: "shinobi",
    cooldown: 10
}