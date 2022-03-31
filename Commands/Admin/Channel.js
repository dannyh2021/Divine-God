const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => 
{
    message.delete()
    let channel = message.channel
    let today = new Date()
    let date = today.toLocaleDateString()
    let time = today.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })

    const role = message.guild.roles.cache.get('815389418051207178')
    const embed = new Discord.MessageEmbed()
    embed.setFooter(`${date}, ${time}`)

    if (args[0].toLowerCase() == 'lock') {
        channel.updateOverwrite(role, {
            'SEND_MESSAGES': false
        })
        embed.setTitle(`🔒 CHANNEL LOCKED`)
        embed.setColor('RED')
        embed.setDescription(`This channel has been locked by ${message.author}`)
        return message.channel.send(embed)
    }

    if (args[0].toLowerCase() == 'unlock') {
        channel.updateOverwrite(role, {
            'SEND_MESSAGES': null
        })
        embed.setTitle(`🔓 CHANNEL UNLOCKED`)
        embed.setColor('00e3ff')
        embed.setDescription(`This channel has been unlocked by ${message.author}`)
        return message.channel.send(embed)
    }

    return message.channel.send(bot.failEmbed(`❌ You can only lock or unlock the channel.`, message.author))
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "Lock or unlock a channel.",
    usage: "[lock | unlock]",
    command: "channel",
    category: "admin",
	args: true
}
