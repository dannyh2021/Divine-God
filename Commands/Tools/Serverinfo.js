const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => 
{
    let member = message.member
    let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    let roles = message.guild.roles.cache.size
    let createdDate = message.guild.createdAt.toLocaleDateString()
    let memberTotal = message.guild.members.cache.filter(member => !member.user.bot).size;
    let botTotal = message.guild.members.cache.size - memberTotal
    let bothChannels = message.guild.channels.cache.filter((c) => c.type !== "category").size;
    let textChannels = message.guild.channels.cache.filter((c) => c.type === "text").size;
    let voiceChannels = bothChannels - textChannels
    let channelTotal = message.guild.channels.cache.size
    let categoryTotal = channelTotal - bothChannels
    let guildId = message.guild.id
  
    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setTitle('ANIME LOUNGE')
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setFooter(`Requested By ${member.user.tag}\n${time}`)
        .addFields(
            {name: `Owner`, value: `<@234106248436514816>`, inline: true},
            {name: `Created On`, value: `${createdDate}`, inline: true},
            {name: `Server Region`, value: `North America - East`, inline: true},
            {name: `Server ID`, value: `${guildId}`, inline: true},
            {name: `Member Total`, value: `${memberTotal}`, inline: true},
            {name: `Bot Total`, value: `${botTotal}`, inline: true},
            {name: `Channel Categories`, value: `${categoryTotal}`, inline: true},
            {name: `Text Channels`, value: `${textChannels}`, inline: true},
            {name: `Voice Channels`, value: `${voiceChannels}`, inline: true},
            {name: `Roles`, value: `${roles}`, inline: true}
        )
    
    message.channel.send(embed)
}

module.exports.config = 
{
    desc: "Get information about the server.",
    command: "serverinfo",
    category: "tools",
    cooldown: 0
}