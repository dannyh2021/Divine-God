const Discord   = require('discord.js');

module.exports.run = async (bot, message, args) => 
{
	let balance = bot.eco.get(message.author.id).balance
	let bank = bot.eco.get(message.author.id).bank
	let input = args[0]
	let amount = parseInt(input)
		
	if (input == 'all'){
		withAmount = bank + balance
		bot.eco.set(`${message.author.id}.bank`, 0)
		bot.eco.set(`${message.author.id}.balance`, withAmount)
		bot.eventEmiter.emit('money', message.member)
		return message.channel.send(bot.embed(`${bot.set.check} You withdrew **${bank.toLocaleString()}** ryo!\n\n${bot.set.currency} Ryo: **${withAmount.toLocaleString()}**\n${bot.set.bank} Bank: **0**
		`, message.author))
	}
	
	if (isNaN(input))
		return message.channel.send(bot.failEmbed(`❌ You did not provide a number value to withdraw.`, message.author))
	
	if (amount > bank)
		return message.channel.send(bot.failEmbed(`❌ You can not withdraw more ryo than you have.`, message.author))
		
	if (amount < 1)
		return message.channel.send(bot.failEmbed(`❌ You have to withdraw more than **0** ryo!`, message.author))
		
	balanceTotal = balance + amount
	bankTotal = bank - amount
	bot.eco.set(`${message.author.id}.balance`, balanceTotal)
	bot.eco.set(`${message.author.id}.bank`, bankTotal)
	bot.eventEmiter.emit('money', message.member)
	return message.channel.send(bot.embed(`${bot.set.check} You withdrew **${amount.toLocaleString()}** ryo!\n\n${bot.set.currency} Ryo: **${balanceTotal.toLocaleString()}**\n${bot.set.bank} Bank: **${bankTotal.toLocaleString()}**`, message.author))
	
}

module.exports.config = 
{
    desc: "Withdraws ryo from your bank.",
	usage: "[all | amount]",
    command: "withdraw",
    aliases: ["with", "wd"],
    category: "economy",
	args: true
}