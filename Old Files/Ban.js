const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let user = message.mentions.members.first()

    if (!user)
        return message.channel.send(bot.failEmbed('❌ You need to ping a user to ban!', message.author))
    
    if (user == message.member)
        return message.channel.send(bot.failEmbed(`❌ You can not ban yourself!`, message.author))

    user.ban()
    message.channel.send(bot.embed(`🚫 You have banned ${user}.`, message.author))
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200"],
    desc: "Ban a user.",
    usage: "[@user]",
    command: "ban",
    category: "admin",
	args: true
}