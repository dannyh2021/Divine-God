const Discord = require('discord.js')
const {titleCase} = require('../../Util/utils')

module.exports.run = async (bot, message, args) => 
{
    let balanceinventory = bot.eco.get(message.author.id).balanceinventory
    let weaponinventory = bot.rpg.get(message.author.id).weaponinventory

    let input = args.join(' ').toLowerCase()

    if (balanceinventory.includes(input)){
        bot.eco.set(`${message.author.id}.balancebackground`, input)
        return message.channel.send(bot.embed(`You have successfully set **${titleCase(input)}** as your balance wallpaper!`, message.author))
    }
    else if (weaponinventory.includes(input)){
        bot.rpg.set(`${message.author.id}.weapon`, input)
        return message.channel.send(bot.embed(`You have successfully equipped **${titleCase(input)}** as your weapon!`, message.author))
    }
    else
        return message.channel.send(bot.failEmbed(`❌ You do not own the item that you are trying to equip!`, message.author))
}

module.exports.config = 
{
    desc: "Equip an item.",
    usage: "[item name]",
    command: "equip",
    aliases: ["eq"],
    category: "economy",
    args: true
}