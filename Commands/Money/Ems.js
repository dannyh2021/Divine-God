const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 101 + 150)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:eternalmangekyosharingan:957442324667969606> You activated your **Eternal Mangekyo Sharingan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280341574430750"],
    desc: "Activate your Eternal Mangekyo Sharingan to earn **150-250** ryo.",
    command: "ems",
    category: "money",
    cooldown: 12 * 3600
}