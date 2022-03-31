const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 151 + 150)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`${bot.set.currency}  You claimed your daily reward of **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    desc: "Claim your daily reward of **150-300** ryo.",
    command: "daily",
    category: "money",
    cooldown: 24 * 3600
}