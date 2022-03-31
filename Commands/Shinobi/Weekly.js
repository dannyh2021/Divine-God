const Discord = require('discord.js')
const { saveSettings } = require('../../Util/utils')
const { formatTime } = require("../../Util/utils");

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start

    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))
        
    if (args[0]){
        if (args[0].toLowerCase() == 'start'){
            if (message.author.id == 234106248436514816){
                const firstEmbed = new Discord.MessageEmbed()
                    .setColor('PURPLE')
                    .setImage('https://i.ibb.co/ZSpdQGR/Banner-Weekly.png')
                
                message.channel.send(firstEmbed)

                const embed = new Discord.MessageEmbed()
                    .setColor('PURPLE')
                    .setThumbnail('https://i.ibb.co/Csv4YQd/Scroll.png')
                    .setTitle('Weekly Mission')
                    .setDescription('Enter the weekly mission.')

                let weeklyMessage = await message.guild.channels.cache.get('956692064219840612').send(embed)

                let input = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 200000, max: 1})
                embed.setDescription(`${input.first().content}\n\nEnter the ryo award.`)
                weeklyMessage.edit(embed)

                let ryoAward = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 200000, max: 1})
                embed.setDescription(`${input.first().content}\n\n**Rewards:**\n\u2001• ${parseInt(ryoAward.first().content).toLocaleString()} ryo\n\nEnter the experience award.`)
                weeklyMessage.edit(embed)

                let xpAward = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 200000, max: 1})
                embed.setDescription(`${input.first().content}\n\n**Rewards:**\n\u2001• ${parseInt(ryoAward.first().content).toLocaleString()} ryo\n\u2001• ${parseInt(xpAward.first().content).toLocaleString()} experience\n\n**Time Remaining:** 7 days`)

                let weeklyDate = Date.now() + (60000 * 60 * 24 * 7)
                
                bot.set.weekly.description = input.first().content
                bot.set.weekly.expiration = weeklyDate
                bot.set.weekly.message = weeklyMessage.id
                bot.set.weekly.status = 'on'
                bot.set.weekly.xpAward = parseInt(xpAward.first().content)
                bot.set.weekly.ryoAward = parseInt(ryoAward.first().content)
                saveSettings(bot)
                return weeklyMessage.edit(embed)
            }
            else
                return
        }
        else
            return
        
    }

    if (bot.set.weekly.status == 'off')
        return message.channel.send(bot.failEmbed(`❌ There is no weekly mission right now!`, message.author))

    let weekly = bot.set.weekly
    let points = bot.eco.get(message.author.id).points
    let time = weekly.expiration - Date.now()

    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setThumbnail('https://i.ibb.co/Csv4YQd/Scroll.png')
        .setAuthor(`Weekly Mission`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
${weekly.description}

**Rewards:**
\u2001• ${weekly.ryoAward.toLocaleString()} ryo
\u2001• ${weekly.xpAward.toLocaleString()} experience

You have sent a total of **${points.toLocaleString()}** messages for this mission!

**Time Remaining:** ${formatTime(time)}

        `)//This needs to be edited for every weekly mission
    message.channel.send(embed)
}

module.exports.config = 
{
    desc: "Check the ongoing weekly event.",
    command: "weekly",
    category: "shinobi",
    cooldown: 0
}