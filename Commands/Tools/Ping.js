const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => 
{
    pingNum = Date.now() - message.createdTimestamp
    pingVal = pingNum / (-1) - 3000
    message.channel.send(`🏓 | Pong! **\`${pingVal}ms\`**`);
}

module.exports.config = 
{
    desc: "Checks your ping.",
    command: "ping",
    category: "tools",
    cooldown: 0
}