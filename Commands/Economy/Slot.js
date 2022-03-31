const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let balance = bot.eco.get(message.author.id).balance
    let betAmount = args[0]

    if (isNaN(betAmount))
        return message.channel.send(bot.failEmbed(`❌ You must provide a number value to bet!`, message.author))

    if (betAmount < 100 || betAmount > 2000)
        return message.channel.send(bot.failEmbed(`❌ You can not bet amount. Bet amounts must range from **100 - 2000** ryo!`, message.author))

    if (betAmount > balance)
        return message.channel.send(bot.failEmbed(`❌ You can not bet more ryo than you have!`, message.author))

    let array = [":moneybag:", ":dollar:", ":coin:", ":credit_card:"]

    let slot1 = array[Math.floor(Math.random() * array.length)]
    let slot2 = array[Math.floor(Math.random() * array.length)]
    let slot3 = array[Math.floor(Math.random() * array.length)]
    let slot4 = array[Math.floor(Math.random() * array.length)]
    let slot5 = array[Math.floor(Math.random() * array.length)]
    let slot6 = array[Math.floor(Math.random() * array.length)]
    let slot7 = array[Math.floor(Math.random() * array.length)]
    let slot8 = array[Math.floor(Math.random() * array.length)]
    let slot9 = array[Math.floor(Math.random() * array.length)]

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .setColor('00e3ff')
        .setDescription(`🎰 You bet **${betAmount}** ryo. Beginning slots now...`)

    let msg = await message.channel.send(embed)
    await bot.sleep(2000)

    if (slot1 == slot2 && slot2 == slot3){
        bot.eco.add(`${message.author.id}.balance`, parseInt(betAmount))
        embed.setDescription(`You won **${betAmount}** ryo!\n\n${slot1} ┊ ${slot2} ┊ ${slot3}\n\n${slot4} ┊ ${slot5} ┊ ${slot6}\n\n${slot7} ┊ ${slot8} ┊ ${slot9}`)
    }
    else if (slot4 == slot5 && slot5 == slot6){
        bot.eco.add(`${message.author.id}.balance`, parseInt(betAmount))
        embed.setDescription(`You won **${betAmount}** ryo!\n\n${slot1} ┊ ${slot2} ┊ ${slot3}\n\n${slot4} ┊ ${slot5} ┊ ${slot6}\n\n${slot7} ┊ ${slot8} ┊ ${slot9}`)
    }
    else if (slot7 == slot8 && slot8 == slot9){
        bot.eco.add(`${message.author.id}.balance`, parseInt(betAmount))
        embed.setDescription(`You won **${betAmount}** ryo!\n\n${slot1} ┊ ${slot2} ┊ ${slot3}\n\n${slot4} ┊ ${slot5} ┊ ${slot6}\n\n${slot7} ┊ ${slot8} ┊ ${slot9}`)
    }
    else{
        bot.eco.subtract(`${message.author.id}.balance`, parseInt(betAmount))
        embed.setColor('RED')
        embed.setDescription(`You lost **${betAmount}** ryo!\n\n${slot1} ┊ ${slot2} ┊ ${slot3}\n\n${slot4} ┊ ${slot5} ┊ ${slot6}\n\n${slot7} ┊ ${slot8} ┊ ${slot9}`)
    }
    return msg.edit(embed)
    
    
}

module.exports.config = 
{
    desc: "Bet your ryo to play slots.",
    usage: "[amount]",
    command: "slot",
    aliases: ["slots"],
    category: "economy",
    cooldown: 60,
    args: true
}