const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let balance = bot.eco.get(message.author.id).balance 
    let random = Math.floor(Math.random() * 4)

    if (args[0] == 'heads' || args[0] == 'head'){
        if (isNaN(args[1]))
            return message.channel.send(bot.failEmbed(`❌ You must specify a number value!`, message.author))

        if (args[1] < 100 || args[1] > 1000)
            return message.channel.send(bot.failEmbed(`❌ You can only bet between **100-1000** ryo`, message.author))

        if (parseInt(args[1]) > balance)
            return message.channel.send(bot.failEmbed(`❌ You can not bet more ryo than you have!`, message.author))

        if (random == 0){
            bot.eco.add(`${message.author.id}.balance`, parseInt(args[1]))
            return message.channel.send(bot.embed(`You won **${parseInt(args[1])}** ryo!\n\n**Details**\n🎰 | Landed on heads\n${bot.set.currency} | Bet Amount: **${args[1]}**`, message.author))
        }
        bot.eco.subtract(`${message.author.id}.balance`, parseInt(args[1]))
        return message.channel.send(bot.failEmbed(`You lost **${parseInt(args[1])}** ryo!\n\n**Details**\n🎰 | Landed on tails\n${bot.set.currency} | Bet Amount: **${args[1]}**`, message.author))
    }

    if (args[0] == 'tails' || args[0] == 'tails'){
        if (isNaN(args[1]))
            return message.channel.send(bot.failEmbed(`❌ You must specify a number value!`, message.author))

        if (args[1] < 100 || args[1] > 1000)
            return message.channel.send(bot.failEmbed(`❌ You can only bet between **100-1000** ryo`, message.author))

        if (parseInt(args[1]) > balance)
            return message.channel.send(bot.failEmbed(`❌ You can not bet more ryo than you have!`, message.author))

        if (random == 0){
            bot.eco.add(`${message.author.id}.balance`, parseInt(args[1]))
            return message.channel.send(bot.embed(`You won **${parseInt(args[1])}** ryo!\n\n**Details**\n🎰 | Landed on tails\n${bot.set.currency} | Bet Amount: **${args[1]}**`, message.author))
        }
        bot.eco.subtract(`${message.author.id}.balance`, parseInt(args[1]))
        return message.channel.send(bot.failEmbed(`You lost **${parseInt(args[1])}** ryo!\n\n**Details**\n🎰 | Landed on heads\n${bot.set.currency} | Bet Amount: **${args[1]}**`, message.author))
    }

        else    
            return message.channel.send(bot.failEmbed(`❌ You must choose heads or tails!`, message.author))
}

module.exports.config = 
{
    desc: "Gamble your ryo. You can gamble between **100-1000** ryo.",
    usage: "[heads | tails] [amount]",
    command: "coin",
    category: "economy",
    cooldown: 60,
	args: true
}