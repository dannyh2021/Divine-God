const Discord = require('discord.js')
const {titleCase} = require('../../Util/utils')

module.exports.run = async (bot, message, args) => 
{
    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setAuthor(`Inventory`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
${bot.set.shuriken} **RPG**
🎨 **Balance Wallpapers**
        `)
		.setThumbnail(message.guild.iconURL({dynamic: true}))
        .setFooter(`React to an emoji to proceed`)
        
    let msg = await message.channel.send(embed)
    msg.react('954816555961700372')
    msg.react('🎨')

    const collector = msg.createReactionCollector((r, u) => u.id == message.author.id, {time: 90000})

    collector.on('collect', (reaction, user) => {
        let emoji = reaction.emoji.name
        reaction.users.remove(user.id)
        let itemCopy;

        switch(emoji){
            case 'shuriken':
                let weaponinventory = bot.rpg.get(message.author.id).weaponinventory
                embed.setAuthor(`Inventory - RPG`)
                embed.setDescription(`Equip a weapon using **\`$equip [weapon name]\`**\n\n**• ${titleCase(weaponinventory.join(' \n• ')) || "None"}**`)
                msg.edit(embed)
                break
            case '🎨':
                let balanceinventory = bot.eco.get(message.author.id).balanceinventory
                embed.setAuthor(`Inventory - Balance Wallpapers`, message.author.avatarURL({dynamic: true}))
                embed.setDescription(`Equip a wallaper using **\`$equip [wallpaper name]\`**\n\n**• ${titleCase(balanceinventory.join(' \n• ')) || "None"}**`)
                msg.edit(embed)
                break
        }
    })

    
}
module.exports.config = 
{
    desc: "Displays your inventory.",
    command: "inventory",
    aliases: ["inv"],
    category: "economy",
}