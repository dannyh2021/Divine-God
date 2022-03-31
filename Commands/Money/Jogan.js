const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 101 + 250)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:jogan:957442332721033276> You activated your **Jogan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280344313311323"],
    desc: "Activate your Jogan to earn **250-350** ryo.",
    command: "jogan",
    category: "money",
    cooldown: 15 * 3600
}