const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let array = []

    let shinobiCount = message.guild.roles.cache.get('957280321613750322').members.map(m=>m.user.id).length
    let oneUser = message.guild.members.cache.array().filter(m => m.roles.cache.has("957280321613750322"))
    for (let user of oneUser){
        array.push(user)
    }

    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setTitle('Shinobi Data')
        .setDescription(`
**Shinobi Count:** ${shinobiCount}
**Shinobi List:**
${array.join('\n')}
        `)
    message.channel.send(embed)
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "View shinobi data.",
    command: "shinobidata",
    category: "admin",
}