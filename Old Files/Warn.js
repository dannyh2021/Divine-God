const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let user = message.mentions.members.first()

    if (!user)  
        return message.channel.send(bot.failEmbed(`❌ You must ping a user to warn!`, message.author))

    if (user == message.member)
        return message.channel.send(bot.failEmbed(`❌ You can not warn yourself!`, message.author))

    if (!args[1]){
        bot.eco.add(`${user.id}.warn`, 1)
        return message.channel.send(`${user}`, {embed: bot.embed(`**You have been warned!**`)})
    }
    
    let reason = args.slice(1).join(' ')
    bot.eco.add(`${user.id}.warn`, 1)
    return message.channel.send(`${user}`, {embed: bot.embed(`**You have been warned!**\n\n**Reason:** ${reason}`)})
}
module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200"],
    desc: "Warns a user.",
    usage: "[@user] <reason>",
    command: "warn",
    category: "admin",
    args: true
}