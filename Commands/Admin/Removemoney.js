const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let user = message.mentions.members.first()
    let amount = args[1]

    if (!user)
        return message.channel.send(bot.failEmbed(`❌ You must ping a user to remove ryo from.`, message.author))

    if (!amount)
        return message.channel.send(bot.failEmbed(`❌ You must specify how many ryo you want to remove from the user.`, message.author))

    if (isNaN(amount))
        return message.channel.send(bot.failEmbed(`❌ You must specify a number value.`, message.author))

    bot.eco.subtract(`${user.id}.balance`, parseInt(amount))
    return message.channel.send(bot.embed(`${bot.set.check} You have successfully removed **${amount}** ryo from ${user}!`, message.author))
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "Removes ryo from a user.",
    usage: "[@user] [amount]",
    command: "removemoney",
    category: "admin",
	args: true
}