const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 51 + 150)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`🛡 You defended your village and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    desc: "Defend your village to earn **150-200** ryo.",
    command: "defend",
    category: "money",
    cooldown: 12 * 3600
}