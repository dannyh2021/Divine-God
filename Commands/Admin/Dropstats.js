const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let dropsPerChannel = bot.set.drops.channels.map(o => `<#${o.id}>: **${o.dropRate}**`);

    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setTitle(`Treasure Drop Stats`)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setDescription(`**__Drop Rate__**\nDefault: **${bot.set.drops.dropRate}**\n${dropsPerChannel.join('\n') || 'none'}\n\n**__Blacklisted Channels__**\n${bot.set.drops.blacklist.map(chID => `<#${chID}>`).join('\n') || 'None'}`)

    return message.channel.send(embed)


}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "Check your drop settings.",
    command: "dropstats",
    category: "admin",
}