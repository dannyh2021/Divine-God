const Discord = require('discord.js');
const bot = new Discord.Client({partials: ["REACTION", "MESSAGE"]});
const db = require('quick.db');
const fs = require('fs');
const { EventEmitter } = require('events');

bot.eventEmiter = new EventEmitter();
bot.set = JSON.parse(fs.readFileSync('./Storage/settings.json'));
bot.config = require('./Config.json');

bot.eco = new db.table('eco');
bot.shop = new db.table('shop');
bot.cooldowns = new db.table('cooldowns')
bot.rpg = new db.table('rpg')

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.talkedRecently = new Set();
bot.drops = new Discord.Collection();
bot.gDrops = new Discord.Collection();

bot.embed = (m, author) => {
	if(author)
		return new Discord.MessageEmbed()
			.setAuthor(author.tag, author.avatarURL({dynamic: true}))
			.setColor("#00e3ff")
			.setDescription(m)
	else
		return new Discord.MessageEmbed()
			.setColor("#00e3ff")
			.setDescription(m)
}

bot.failEmbed = (m, author) => {
	if(author)
		return new Discord.MessageEmbed()
		.setAuthor(author.tag, author.avatarURL({dynamic: true}))
			.setColor("RED")
			.setDescription(m)
	else
		return new Discord.MessageEmbed()
			.setColor("RED")
			.setDescription(m)
}


bot.sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))
require('./Handlers/Commands.js')(bot);
require('./Handlers/Events.js')(bot);

bot.login(bot.config.token);