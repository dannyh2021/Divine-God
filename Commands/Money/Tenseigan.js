const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 251 + 750)

    bot.eco.add(`${message.author.id}.balance`, amount)

    message.channel.send(bot.embed(`<:tenseigan:957442380695482368> You activated your **Tenseigan** and earned **${amount}** ryo!`, message.author))
}

module.exports.config = 
{
    roles: ["957280351917600818"],
    desc: "Activate your Tenseigan to earn **750-1,000** ryo.",
    command: "tenseigan",
    category: "money",
    cooldown: 24 * 3600
}