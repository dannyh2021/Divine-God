const Discord = require('discord.js')
const { titleCase } = require('../../Util/utils.js')

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start
    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))

    let shop = bot.set.shop
    let input = args.join(' ').toLowerCase()
    let weaponinventory = bot.rpg.get(message.author.id).weaponinventory
    
    if (!weaponinventory.includes(input))
        return message.channel.send(bot.failEmbed(`❌ You do not own this item!`, message.author))

    let number = shop.weapon.findIndex(item => item.name === input)
    let sellPrice = shop.weapon[number].price * 0.5

    weaponinventory.splice(weaponinventory.indexOf(input), 1)

    bot.rpg.set(`${message.author.id}.weaponinventory`, weaponinventory)
    bot.rpg.set(`${message.author.id}.weapon`, "None")
    bot.eco.add(`${message.author.id}.balance`, sellPrice)

    message.channel.send(bot.embed(`You have sold **${titleCase(input)}** for **${sellPrice}** ryo!`, message.author))
}

module.exports.config = 
{
    desc: "Sell a shinobi item.",
    usage: "[item name]",
    command: "sell",
    category: "shinobi",
    args: true
}