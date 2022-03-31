const Discord   = require('discord.js');

module.exports.run = async (bot, message, args) =>
{
	let member = message.member
	let balance = bot.eco.get(member.id).balance
	let input = args[0]
	let amount = parseInt(input)

	if (input.toLowerCase() == 'all'){
		bot.eco.add(`${member.id}.bank`, balance)
		bot.eco.set(`${member.id}.balance`, 0)
		bot.eventEmiter.emit('money', message.member)
		return message.channel.send(bot.embed(`${bot.set.check} You deposited **${balance.toLocaleString()}** ryo!\n\n${bot.set.currency} Ryo: **0**\n${bot.set.bank} Bank: **${bot.eco.get(message.author.id).bank.toLocaleString()}**`, message.author))
	}
	if (isNaN(input))
		return message.channel.send(bot.failEmbed(`❌ You did not provide a number value to deposit!`, message.author))

	if (amount > balance)
		return message.channel.send(bot.failEmbed(`❌ You cannot deposit more ryo than you have!`, message.author))

	if (amount < 1)
		return message.channel.send(bot.failEmbed(`❌ You have to deposit more than **0** ryo!`, message.author))

	bot.eco.add(`${member.id}.bank`, amount)
	bot.eco.subtract(`${member.id}.balance`, amount)
	bot.eventEmiter.emit('money', message.member)
	return message.channel.send(bot.embed(`${bot.set.check} You deposited **${amount.toLocaleString()}** ryo!\n\n${bot.set.currency} Ryo: **${bot.eco.get(message.author.id).balance.toLocaleString()}**\n${bot.set.bank} Bank: **${bot.eco.get(message.author.id).bank.toLocaleString()}**`, message.author))

}

module.exports.config = 
{
    desc: `Deposits your ryo into your bank.`,
	usage: "[all | amount]",
    command: "deposit",
    aliases: ["dep"],
    category: "economy",
	args: true
}
