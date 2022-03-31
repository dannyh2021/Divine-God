const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 51 + 200)
    let random = Math.floor(Math.random() * 4 + 2)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`🚨 You reported **${random}** suspicious individuals and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    desc: "Report a suspicious activity to earn **100-200** ryo.",
    command: "report",
    category: "money",
    cooldown: 4 * 3600
}