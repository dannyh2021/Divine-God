const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 151 + 350)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:rinnegan:957442358037852250> You activated your **Rinnegan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280331470372935"],
    desc: "Activate your Rinnegan to earn **350-500** ryo.",
    command: "rinnegan",
    category: "money",
    cooldown: 18 * 3600
}