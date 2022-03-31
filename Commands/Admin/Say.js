const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let content = args.join(' ')
    message.delete()

    if (content == 'mission'){
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(`https://i.ibb.co/Csv4YQd/Scroll.png`)
            .setDescription(`Please enter a title for this mission.`)
    
        let msg = await message.channel.send(embed)

        let title = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 60000, max: 1})
        if (!title.first()){
            embed.setColor('RED')
            embed.setDescription(`❌ You did not provide a title for the mission!`)
            msg.edit(embed)
            await bot.sleep(3000)
            return msg.delete()
        }
        title.first().delete()
        embed.setTitle(title.first().content)
        embed.setDescription(`Please enter the description for this mission.`)
        msg.edit(embed)

        let description = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 60000, max: 1})
        if (!description.first()){
            embed.setColor('RED')
            embed.setDescription(`❌ You did not provide a description for the mission!`)
            msg.edit(embed)
            await bot.sleep(3000)
            return msg.delete()
        }
        description.first().delete()
        embed.setDescription(`**Description:**\n${description.first().content}\n\nPlease enter the ryo reward for this mission.`)
        msg.edit(embed)

        let ryoAward = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 60000, max: 1})
        if (!ryoAward.first()){
            embed.setColor('RED')
            embed.setDescription(`❌ You did not provide a ryo award for the mission!`)
            msg.edit(embed)
            await bot.sleep(3000)
            return msg.delete()
        }
        ryoAward.first().delete()
        if (isNaN(ryoAward.first().content)){
            embed.setColor('RED')
            embed.setDescription(`❌ You did not provide a number value for the ryo award!`)
            msg.edit(embed)
            await bot.sleep(3000)
            return msg.delete()
        }
        embed.setDescription(`**Description:**\n${description.first().content}\n\n**Rewards:**\n\u2001• ${ryoAward.first().content} ryo\n\nPlease enter the experience reward for this mission.`)
        msg.edit(embed)

        let xpAward = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 60000, max: 1})
        if (!xpAward.first()){
            embed.setColor('RED')
            embed.setDescription(`❌ You did not provide an experience award for the mission!`)
            msg.edit(embed)
            await bot.sleep(3000)
            return msg.delete()
        }
        xpAward.first().delete()
        if (isNaN(xpAward.first().content)){
            embed.setColor('RED')
            embed.setDescription(`❌ You did not provide a number value for the experience award!`)
            msg.edit(embed)
            await bot.sleep(3000)
            return msg.delete()
        }

        embed.setDescription(`**Description:**\n${description.first().content}\n\n**Rewards:**\n\u2001• ${ryoAward.first().content} ryo\n\u2001• ${xpAward.first().content} experience\n\nYou have created a mission!`)
        msg.edit(embed)
        await bot.sleep(3000)

        embed.setDescription(`**Description:**\n${description.first().content}\n\n**Rewards:**\n\u2001• ${ryoAward.first().content} ryo\n\u2001• ${xpAward.first().content} experience\n\nAccept this mission by reacting to ${bot.set.shuriken} and message <@575252669443211264> to await further instructions.`)
        msg.react('954816555961700372')
        return msg.edit(embed)
        
    }

    message.channel.send(bot.embed(`${content}`, message.author))
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    desc: "Say a message through the bot as an embed.",
    usage: "<message>",
    command: "say",
    category: "admin",
	args: true
}