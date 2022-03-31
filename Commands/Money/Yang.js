const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 251 + 500)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:yinyang:957442388559794238> You activated your **Yang Release** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280348411166720"],
    desc: "Activate your Yang Release to earn **500-750** ryo.",
    command: "yang",
    category: "money",
    cooldown: 22 * 3600
}