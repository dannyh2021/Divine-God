const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 21 + 30)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:byakugan:957442644882120764> You activated your **Byakugan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280338122518578"],
    desc: "Activate your Byakugan to earn **30-50** ryo.",
    command: "byakugan",
    category: "money",
    cooldown: 2 * 3600
}