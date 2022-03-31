const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 51 + 100)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:mangekyosharingan:957442340270772267> You activated your **Mangekyo Sharingan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280328223977532"],
    desc: "Activate your Mangekyo Sharingan to earn **100-150** ryo.",
    command: "ms",
    category: "money",
    cooldown: 6 * 3600
}