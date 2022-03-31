const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 251 + 500)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:yinyang:957442388559794238> You activated your **Yin Release** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280335069061130"],
    desc: "Activate your Yin Release to earn **500-750** ryo.",
    command: "yin",
    category: "money",
    cooldown: 22 * 3600
}