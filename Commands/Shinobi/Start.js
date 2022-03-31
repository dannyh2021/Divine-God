const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start

    if (start == 1)
        return

    bot.eco.set(`${message.author.id}.start`, 1)
    let shinobiCount = message.guild.roles.cache.get('957280321613750322').members.map(m=>m.user.id).length

    const embed = new Discord.MessageEmbed()
        .setTitle('__Welcome To The Shinobi World!__')
        .setColor('00e3ff')
        .setImage('https://i.ibb.co/bNR3VXr/Shinobi-Welcome.png')
        .setDescription(`
Thank you for entering the shinobi world! 
We wish you luck on your journey to becoming the strongest shinobi!
You are **Shinobi #${shinobiCount + 1}**.

Use these commands to begin your adventure:
**$profile:** view your shinobi profile
**$shinobileaderboard [lvl | xp]:** view shinobi leaderboard of top members with highest level of experience
**$enemy:** view a list of all enemies available in missions
**$train:** train yourself as a shinobi to earn experience
**$drank:** go on a D-Rank mission to earn experience and ryo
**$crank:**  go on a C-Rank mission to earn experience and ryo
**$brank:** go on a B-Rank mission to earn experience and ryo
**$arank:** go on an A-Rank mission to earn experience and ryo
 `)
    .setFooter(message.author.tag, message.author.avatarURL())

message.channel.send(embed)
message.member.roles.add('957280321613750322')
}

module.exports.config = 
{
    desc: "Starts your Naruto RPG adventure.",
    command: "start",
    category: "shinobi",
}