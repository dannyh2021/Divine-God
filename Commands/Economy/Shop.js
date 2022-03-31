const Discord = require('discord.js');
const { formatToPageList, titleCase } = require('../../Util/utils.js')

module.exports.run = async (bot, message, args, prefix) => 
{
    let page = args.shift() || 1;
    let shop = bot.set.shop
    let uRoles = message.member.roles.cache
    let balanceinventory = bot.eco.get(message.author.id).balanceinventory
    let weaponinventory = bot.rpg.get(message.author.id).weaponinventory

    const shopEmbed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setAuthor(`Shop`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
<:sharingan:957442366304821319> **Roles**
${bot.set.shuriken} **RPG**
🎨 **Balance Wallpapers**
        `)
		.setThumbnail(message.guild.iconURL({dynamic: true}))
        .setFooter(`React to an emoji to proceed`)
        
    let msg = await message.channel.send(shopEmbed)
    msg.react('957442366304821319')
    msg.react('954816555961700372')
    msg.react('🎨')


    let canScroll = false, oPageData, aFormatedItems;
    const collector = msg.createReactionCollector((r, u) => u.id == message.author.id, {time: 90000})

    collector.on('collect', (reaction, user) => {
        let emoji = reaction.emoji.name
        reaction.users.remove(user.id)
        let itemCopy;

        switch(emoji){
            case 'sharingan':
                canScroll = false;
                aFormatedItems = shop.role.map(o => `${bot.set.currency} **${o.price.toLocaleString()}** ‎• <@&${o.id}> ${uRoles.has(o.id) ? `${bot.set.check}` : '❌'}\n\u2001⮕ ${o.description}\n`)
                oPageData = formatToPageList(aFormatedItems, page, 'No items', 10)

                shopEmbed.setAuthor(`Shop - Roles`, message.author.avatarURL({dynamic: true}))
                shopEmbed.setDescription(`Buy items using **\`$buy [item name]\`**\n\n${oPageData.list}`)
                msg.edit(shopEmbed)
                break

            case 'shuriken':
                canScroll = true;
                msg.reactions.removeAll()
                msg.react('⬅️')
                msg.react('➡️')
                
                aFormatedItems = shop.weapon.map(o => `${bot.set.currency} **${o.price.toLocaleString()} ‎• [${titleCase(o.name)}](${o.link})** ${weaponinventory.includes(o.name) ? `${bot.set.check}` : '❌'}\n\u2001⮕ **Level:** ${o.level}\n\u2001⮕ **Power:** ${o.power}\n`)
                oPageData = formatToPageList(aFormatedItems, page, 'No items', 5)

                shopEmbed.setAuthor(`Shop - RPG`, message.author.avatarURL({dynamic: true}))
                shopEmbed.setDescription(`Buy items using **\`$buy [item name]\`**\n\n${oPageData.list}`)
                shopEmbed.setFooter(oPageData.pages)
                msg.edit(shopEmbed)
                break

            case '🎨':
                canScroll = false;
                aFormatedItems = shop.balanceWallpaper.map(o => `${bot.set.currency} **${o.price.toLocaleString()} ‎• ${o.text}** ${balanceinventory.includes(o.name) ? `${bot.set.check}` : '❌'}`)
                oPageData = formatToPageList(aFormatedItems, page, 'No items', 10)

                shopEmbed.setAuthor(`Shop - Balance Wallpapers`, message.author.avatarURL({dynamic: true}))
                shopEmbed.setDescription(`Buy items using **\`$buy [item name]\`**\n\n${oPageData.list}`)
                msg.edit(shopEmbed)
                break

            case '➡️':
                if(!canScroll || !oPageData || oPageData.pages.split('').pop() == 1)
                    return;

                page++;
                if(page > Math.ceil((aFormatedItems.length) / 5))
                    page = 0;

                oPageData = formatToPageList(aFormatedItems, page, 'No items', 5);
                shopEmbed.setDescription(`Buy items using \`${prefix}buy [item name]\`\n\n${oPageData.list}`)
                shopEmbed.setFooter(oPageData.pages)
                msg.edit(shopEmbed);
                break;


            case '⬅️':
                if(!canScroll || !oPageData || oPageData.pages.split('').pop() == 1)
                    return;

                page--;
                if(page < 0)
                    page = Math.ceil((aFormatedItems.length) / 5);
                
                oPageData = formatToPageList(aFormatedItems, page, 'No items', 5);
                shopEmbed.setDescription(`Buy items using \`${prefix}buy [item name]\`\n\n${oPageData.list}`)
                shopEmbed.setFooter(oPageData.pages)
                msg.edit(shopEmbed)
                break;
        }
    })

    
}

module.exports.config = 
{
    desc: "Displays the Server Shop.",
    command: "shop",
    aliases: ["store"],
    category: "economy"
}