const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    message.delete()
    await bot.sleep(1500)
    let idNumber = args[0]
    let reply = args.slice(1).join(' ')

    let msg = await bot.channels.resolve("949126733460820038").messages.fetch(`${idNumber}`)

    const embed = msg.embeds[0]
    embed.addField(`Response`, `${reply}`)
    embed.setFooter(`Response By ${message.author.tag}`, message.author.avatarURL())
    msg.edit(embed)
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "Reply to a user's suggestion",
    usage: "[message ID][reply]",
    command: "reply",
    category: "admin",
	args: true
}