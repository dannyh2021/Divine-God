const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let suggestion = args.join(' ')
    message.delete()
    await bot.sleep(1500)

    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setAuthor(`Suggestion By ${message.author.tag}`, message.author.avatarURL({dynamic: true}))
        .setDescription(`${suggestion}`)

    let msg = await message.channel.send(embed)
    msg.react(`955834256083542056`)
    msg.react('❌')
}

module.exports.config = 
{
    desc: "Suggest a suggestion for the server/bot.",
    usage: "[suggestion]",
    command: "suggest",
    category: "tools",
    cooldown: 3600,
	args: true
}