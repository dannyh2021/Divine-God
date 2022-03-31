const Discord = require('discord.js')
const { missingPerms, hasPerms } = require('../../Util/missingPerms.js')
const { formatTime } = require('../../Util/utils.js')

module.exports.run = async(bot, message, prefix) =>
{
    const args = message.content.slice(bot.config.prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase();


    let command

    if(bot.commands.has(commandName))
        command = bot.commands.get(commandName);
    else if(bot.aliases.has(commandName))
        command = bot.commands.get(bot.aliases.get(commandName))
    else 
        return

    let commandBypass = ["234106248436514816", "390836821723971594", "560282666361159690", "739639715598172170", "839315540068794399"]//ID of users who can use commands anywhere.
    let commandAllowed = ["954358378707156993", "955684987502465044"]//List of channel ID where commands are allowed to be used.
    let array = ["815374974453284884", "815376745930031135", "954192595028947045", "954358378707156993", "954358457472024616", "955684987502465044"]//List of channels where $claim can be used.
    let commandAnywhere = ["message"]

    if (!commandAnywhere.includes(commandName)){
        if (!commandBypass.includes(`${message.author.id}`)){
            if (commandName == 'claim'){
                if (!array.includes(`${message.channel.id}`))
                    return message.channel.send(bot.failEmbed('❌ You can not use this command here!', message.author))
                
            }
            else if (commandName == 'suggest'){
                if (message.channel.id != 949126733460820038)
                    return message.channel.send(bot.failEmbed(`❌ You can not use this command here! Please use it in <#949126733460820038>`, message.author))
            }
    
            else if (commandName == 'srank' || commandName == 'arank' || commandName == 'brank' || commandName == 'crank' || commandName == 'drank'){
                if (message.channel.id != 955593550949654548)
                    return message.channel.send(bot.failEmbed(`❌ You can not use this command here! Please use it in <#955593550949654548>`, message.author))
            }
    
            else if (!commandAllowed.includes(`${message.channel.id}`))
                return message.channel.send(bot.failEmbed(`❌ You can only use this command in <#954358378707156993> and <#955684987502465044>`, message.author))
        }
    }
    

    if(command.config.args && !args.length) {
        if(command.config.usage){
            message.channel.send(bot.failEmbed(`❌ **Usage:** \`$${command.config.command} ${command.config.usage}\``, message.author))
            return
        }
    }

    roles:
    if(command.config.roles){
        for(let roleID of command.config.roles){
            for(let userRole of message.member.roles.cache.array()){
                if(roleID == userRole.id){
                    break roles;
                }
            }
        }
        return message.channel.send(bot.failEmbed(`❌ You need the following roles to use **$${commandName}**:\n ${command.config.roles.map(id => `<@&${id}>`).join('\n')}`, message.author))
    }
    

    if(!bot.cooldowns.has(command.config.command)) bot.cooldowns.set(command.config.command, {});

    const now = Date.now();
    const timestamps = bot.cooldowns.get(command.config.command);
    const cooldownAmount = (command.config.cooldown || 0) * 1000;

    if(message.author.id in timestamps) {
        const expDate = timestamps[message.author.id] + cooldownAmount;

        if(now < expDate){
            const timeLeft = expDate - now
            return message.channel.send(bot.failEmbed(`⏲ You can use **$${command.config.command}** again in **${formatTime(timeLeft)}**`, message.author))
        }
    }

    bot.cooldowns.set(`${command.config.command}.${message.author.id}`, now)
    setTimeout(() => bot.cooldowns.delete(`${command.config.command}.${message.author.id}`), cooldownAmount);
    
    //======================================================================
    try { 
        command.run(bot, message, args, prefix); 
    } catch (err) { 
        console.log("Unknown error", command.config.command); 
        message.channel.send("Unknown error"); 
    }
    //======================================================================
};