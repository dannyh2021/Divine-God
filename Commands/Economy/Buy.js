const Discord = require('discord.js')
const { titleCase } = require('../../Util/utils.js')

module.exports.run = async (bot, message, args) => 
{
    let input = args.join(' ').toLowerCase()

    let data = bot.eco.get(message.author.id)
    let rpgdata = bot.rpg.get(message.author.id)

    let balance = data.balance
    let balanceinventory = data.balanceinventory

    let weaponinventory = rpgdata.weaponinventory
    let level = rpgdata.level

    let shop = bot.set.shop
    price = 0

    function shinobiCheck(){
        let start = bot.eco.get(message.author.id).start
        if (start == 0)
            return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))
    }
    
    //RPG Stuff

    if (shop.weapon.some(item => item.name === input)){
        shinobiCheck()
        number = shop.weapon.findIndex(item => item.name === input)
        itemPrice = shop.weapon[number].price
        itemName = shop.weapon[number].name
        itemLevel = shop.weapon[number].level
        itemLink = shop.weapon[number].link

        if (weaponinventory.includes(itemName))
            return message.channel.send(bot.failEmbed(`❌ You already own **[${titleCase(itemName)}](${itemLink})**!`, message.author))

        if (balance < itemPrice)
            return message.channel.send(bot.failEmbed(`❌ You do not have enough ryo to purchase this weapon!\n\nItem Cost: **${itemPrice.toLocaleString()}** ${bot.set.currency}\nYour Balance: **${balance.toLocaleString()}** ${bot.set.currency}`, message.author))

        if (level < itemLevel)
            return message.channel.send(bot.failEmbed(`❌ You are not high enough level to purchase this weapon!\n\nLevel Required: **${itemLevel}**\nYour Level: **${level}**`, message.author))
        bot.eco.subtract(`${message.author.id}.balance`, itemPrice)
        bot.rpg.push(`${message.author.id}.weaponinventory`, itemName)
        return message.channel.send(bot.embed(`You have successfully purchased **[${titleCase(itemName)}](${itemLink})** for **${itemPrice.toLocaleString()}** ryo!`, message.author))
    }

    //Balance Wallpapers
    else if (shop.balanceWallpaper.some(item => item.name === input)){
        number = shop.balanceWallpaper.findIndex(item => item.name === input)
        itemName = shop.balanceWallpaper[number].name
        itemPrice = shop.balanceWallpaper[number].price
        itemText = shop.balanceWallpaper[number].text
        if (balanceinventory.includes(itemName))
            return message.channel.send(bot.failEmbed(`❌ You already own **${itemText}**!`, message.author))
        if (balance < itemPrice)
            return message.channel.send(bot.failEmbed(`❌ You do not have enough ryo to purchase this item!\n\nItem Cost: **${itemPrice.toLocaleString()}** ${bot.set.currency}\nYour Balance: **${balance.toLocaleString()}** ${bot.set.currency}`, message.author))
        bot.eco.subtract(`${message.author.id}.balance`, itemPrice)
        bot.eco.push(`${message.author.id}.balanceinventory`, itemName)
        return message.channel.send(bot.embed(`You have successfully purchased **${itemText}** for **${itemPrice.toLocaleString()}** ryo!`, message.author))
    }

    //Roles
    else if (shop.role.some(item => item.name === input)){
        number = shop.role.findIndex(item => item.name === input)
        roleName = shop.role[number].name
        roleid = shop.role[number].id
        rolePrice = shop.role[number].price
        if (message.member.roles.cache.has(roleid))
            return message.channel.send(bot.failEmbed(`❌ You already have <@&${roleid}>!`, message.author))
        if (balance < rolePrice)
            return message.channel.send(bot.failEmbed(`❌ You do not have enough ryo to purchase this item!\n\nItem Cost: **${rolePrice.toLocaleString()}** ${bot.set.currency}\nYour Balance: **${balance.toLocaleString()}** ${bot.set.currency}`, message.author))
        bot.eco.subtract(`${message.author.id}.balance`, rolePrice)
        message.member.roles.add(roleid)
        return message.channel.send(bot.embed(`You have successfully purchased <@&${roleid}> for **${rolePrice.toLocaleString()}** ryo!`, message.author))
    }


    else
        return message.channel.send(bot.failEmbed(`❌ You did not specify an available item from the shop!`, message.author))
}

module.exports.config = 
{
    desc: "Buy an item from the server shop.",
    usage: "[item name]",
    command: "buy",
    category: "economy",
    cooldown: 0,
	args: true
}