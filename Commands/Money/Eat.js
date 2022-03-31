const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 26 + 75)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`🍜 You ate a meal and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    desc: "Eat a meal to earn **75-100** ryo.",
    command: "eat",
    category: "money",
    cooldown: 4 * 3600
}