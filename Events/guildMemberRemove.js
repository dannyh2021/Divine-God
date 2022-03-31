const Discord = require('discord.js')

module.exports = async(bot, guildMemberLeave) => 
{
    let leaveChannel = guildMemberLeave.guild.channels.cache.get("958556372688060426")
    leaveChannel.send(`**${guildMemberLeave.user.tag}** is a loser who just left our server! 🤺`)
    bot.eco.delete(guildMemberLeave.id)
    bot.rpg.delete(guildMemberLeave.id)
}