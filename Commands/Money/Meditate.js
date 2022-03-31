const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 51 + 200)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`🧘‍♀️ You did your daily meditation and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    desc: "Meditate to earn a reward of **200-250** ryo.",
    command: "meditate",
    category: "money",
    cooldown: 24 * 3600
}