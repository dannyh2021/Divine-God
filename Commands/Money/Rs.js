const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 501 + 1000)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:rinnesharingan:957442350093828146> You activated your **Rinne Sharingan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280403322978304"],
    desc: "Activate your Rinne Sharingan to earn **1,000-1,500** ryo.",
    command: "rs",
    category: "money",
    cooldown: 24 * 3600
}