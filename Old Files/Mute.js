const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let user = message.mentions.members.first()
    let second = 1000
    let minute = 60 * second
    let hour = 60 * minute
    const now = Date.now()


    if (!user)
        return message.channel.send(bot.failEmbed(`❌ You must ping a user to mute!`, message.author))

    if (user == message.member) 
        return message.channel.send(bot.failEmbed(`❌ You can not mute yourself!`, message.author))

    if (user.roles.cache.has('815393927913799701'))
        return message.channel.send(bot.failEmbed('❌ This user is already muted!', message.author))

    if (!args[1]){
        return message.channel.send(bot.embed(`❌ You must specify how long you want to mute the user for!`, message.author))
    }

    if (isNaN(args[1]))
        return message.channel.send(bot.failEmbed(`❌ You must enter a number value first!`, message.author))

    if (args[2] != 's' && args[2] != 'm' && args[2] != 'h')
        return message.channel.send(bot.failEmbed(`❌ Must specify **[s | m | h]**.`, message.author))

    if (args[2] == 's'){
        muteAmount = args[1] * second
        muteSet = now + muteAmount
        bot.eco.set(`${user.id}.mutetime`, muteSet)
        user.roles.add('815393927913799701')
        return message.channel.send(bot.embed(`🔇 You have muted ${user} for **${args[1]}** seconds!`, message.author))
    }
    if (args[2] == 'm'){
        muteAmount = args[1] * minute
        muteSet = now + muteAmount
        bot.eco.set(`${user.id}.mutetime`, muteSet)
        user.roles.add('815393927913799701')
        return message.channel.send(bot.embed(`🔇 You have muted ${user} for **${args[1]}** minutes!`, message.author))
    }
    if (args[2] == 'h'){
        muteAmount = args[1] * hour
        muteSet = now + muteAmount
        bot.eco.set(`${user.id}.mutetime`, muteSet)
        user.roles.add('815393927913799701')
        return message.channel.send(bot.embed(`🔇 You have muted ${user} for **${args[1]}** hours!`, message.author))
    }
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200"],
    desc: "Mute a user ",
    usage: "[@user] <time> ",
    command: "mute",
    category: "admin",
	args: true
}