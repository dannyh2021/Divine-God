const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 26 + 50)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:sharingan:957442366304821319> You activated your **Sharingan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280324746883083"],
    desc: "Activate your Sharingan to earn **50-75** ryo.",
    command: "sharingan",
    category: "money",
    cooldown: 2.5 * 3600
}