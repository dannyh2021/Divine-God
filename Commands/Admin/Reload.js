const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => 
{   
    if (message.author.id != 234106248436514816)
        return
        
    const query = args[0] ? args[0].toLowerCase() : null;
	if(!args.length){
		require('../../Handlers/Commands.js')(bot);
		return message.channel.send("All commands were reloaded!");
	}

    if(query == 'settings'){
        bot.set = JSON.parse(fs.readFileSync('./Storage/settings.json'));
        return message.channel.send('**Settings** was reloaded')
    }
	
	if(bot.config.categories.includes(query)){
		try{
			require('../../Handlers/Commands.js').reloadCategory(bot, query);
			message.channel.send(`**${args[0]}** folder was reloaded!`);
        }catch(error){ 
            console.log(error);
            message.channel.send("Error when loading commands"); 
        }
        return;
    } 
    
    let command;
    if(bot.commands.has(query)) command = bot.commands.get(query);
    else if(bot.aliases.has(query)) command = bot.commands.get(bot.aliases.get(query));
    else return message.channel.send(`${firstCap(query)} was not found!`);
    
    delete require.cache[require.resolve(`../${command.config.category}/${command.config.command}.js`)];

    try {
        const cmd = require(`../${command.config.category}/${command.config.command}.js`);
        bot.commands.set(cmd.config.command, cmd);
        console.log(`Command ${cmd.config.command} was reloaded!`);
        return message.channel.send(`**${cmd.config.command}** command was reloaded!`);
    } catch (error) {
        console.log(error);
        return message.channel.send(`There was an error while reloading a command **${command.config.command}**`);
    }
}

module.exports.config = 
{
    roles: ["954181231476609074"],
    desc: "Reload a command or folder.",
    usage: "[folder name | command name | settings]",
    command: "reload",
    aliases: ["r"],
    category: "custom",
    args: true
}