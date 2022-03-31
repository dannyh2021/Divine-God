const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let input = args[0]

    if (isNaN(input))
        return message.channel.send(bot.failEmbed(`❌ You must specify a numerical value of messages to delete!`, message.author))

    if (input > 100)
        return message.channel.send(bot.failEmbed(`❌ You can only delete up to **100** messages at once!`, message.author))


    let amount = parseInt(input)

    message.channel.bulkDelete(amount + 1)

message.channel.send(`I have deleted **${amount}** messages!`).then(msg => msg.delete({timeout: 3000}))
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "Deletes messages in a channel.",
    usage: "[amount]",
    command: "clear",
    category: "admin",
	args: true
}