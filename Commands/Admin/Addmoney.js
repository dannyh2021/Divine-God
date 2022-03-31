const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{

    if (!user)
        return message.channel.send(bot.failEmbed(`❌ You must ping a user to add ryo to.`, message.author))

    if (!amount)
        return message.channel.send(bot.failEmbed(`❌ You must specify how many ryo you want to add to the user.`, message.author))

    if (isNaN(amount))
        return message.channel.send(bot.failEmbed(`❌ You must specify a number value.`, message.author))

    bot.eco.add(`${user.id}.balance`, parseInt(amount))
    return message.channel.send(bot.embed(`${bot.set.check} You have successfully added **${amount}** ryo to ${user}!`, message.author))
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "Adds ryo to a user.",
    usage: "[@user] [amount]",
    command: "addmoney",
    category: "admin",
	args: true
}