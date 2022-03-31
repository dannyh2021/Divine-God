const Discord = require('discord.js')
const { formatTime } = require('../../Util/utils.js')
const { titleCase } = require('../../Util/utils')

module.exports.run = async (bot, message, args) => 
{
    let user = message.member
    let array = []
    let rpgArray = []
    let roleArray = []

    function standardCD(){
        command = bot.commands.get(commandName)
        const now = Date.now()
        const timestamps = bot.cooldowns.get(command.config.command)
        const cooldownAmount = (command.config.cooldown || 0) * 1000
        const expDate = timestamps[message.author.id] + cooldownAmount;
        const timeLeft = expDate - now
        
        
        if(message.author.id in timestamps) {
            if (now < expDate)
                array.push(`**$${commandName}** - ${formatTime(timeLeft)}`)

            if (now > expDate){
                bot.cooldowns.delete(`${commandName}.${message.author.id}`)
                array.push(`**$${commandName}** - Ready!`)
            }
        }
        else
            array.push(`**$${commandName}** - Ready!`)
    }

    function rpgCD(){
        command = bot.commands.get(commandName)
        const now = Date.now()
        const timestamps = bot.cooldowns.get(command.config.command)
        const cooldownAmount = (command.config.cooldown || 0) * 1000
        const expDate = timestamps[message.author.id] + cooldownAmount;
        const timeLeft = expDate - now
        
        
        if(message.author.id in timestamps) {
            if (now < expDate)
                rpgArray.push(`**$${commandName}** - ${formatTime(timeLeft)}`)

            if (now > expDate){
                bot.cooldowns.delete(`${commandName}.${message.author.id}`)
                rpgArray.push(`**$${commandName}** - Ready!`)
            }
        }
        else
        rpgArray.push(`**$${commandName}** - Ready!`)
    }

    function roleCD(){
        command = bot.commands.get(commandName)
        const now = Date.now()
        const timestamps = bot.cooldowns.get(command.config.command)
        const cooldownAmount = (command.config.cooldown || 0) * 1000
        const expDate = timestamps[message.author.id] + cooldownAmount;
        const timeLeft = expDate - now
        
        
        if(message.author.id in timestamps) {
            if (now < expDate)
            roleArray.push(`**$${commandName}** - ${formatTime(timeLeft)}`)

            if (now > expDate){
                bot.cooldowns.delete(`${commandName}.${message.author.id}`)
                roleArray.push(`**$${commandName}** - Ready!`)
            }
        }
        else
        roleArray.push(`**$${commandName}** - Ready!`)
    }

    commandName = 'daily'
    standardCD()
    commandName = 'meditate'
    standardCD()
    commandName = 'defend'
    standardCD()
    commandName = 'eat'
    standardCD()
    commandName = 'report'
    standardCD()
    commandName = 'search'
    standardCD()

    commandName = 'shinobidaily'
    rpgCD()
    commandName = 'drank'
    rpgCD()
    commandName = 'crank'
    rpgCD()
    commandName = 'brank'
    rpgCD()
    commandName = 'arank'
    rpgCD()
    commandName = 'srank'
    rpgCD()

    if (user.roles.cache.has('957280403322978304')){
        commandName = 'rs'
        roleCD()
    }
    if (user.roles.cache.has('957280351917600818')){
        commandName = 'tenseigan'
        roleCD()
    }
    if (user.roles.cache.has('957280335069061130')){
        commandName = 'yin'
        roleCD()
    }
    if (user.roles.cache.has('957280348411166720')){
        commandName = 'yang'
        roleCD()
    }
    if (user.roles.cache.has('957280331470372935')){
        commandName = 'rinnegan'
        roleCD()
    }
    if (user.roles.cache.has('957280344313311323')){
        commandName = 'jogan'
        roleCD()
    }
    if (user.roles.cache.has('957280341574430750')){
        commandName = 'ems'
        roleCD()
    }
    if (user.roles.cache.has('957280328223977532')){
        commandName = 'ms'
        roleCD()
    }    
    if (user.roles.cache.has('957280324746883083')){
        commandName = 'sharingan'
        roleCD()
    }
    if (user.roles.cache.has('957280338122518578')){
        commandName = 'byakugan'
        roleCD()
    }

    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setAuthor(`Cooldown List`, message.author.avatarURL({dynamic: true}))
        .addFields(
            {name: `**__Standard Commands__**`, value: `${array.join('\n')}`, inline: true},
            {name: `**__Role Commands__**`, value: `${roleArray.join('\n') || 'None'}`, inline: true},
            {name: `**__RPG Commands__**`, value: `${rpgArray.join('\n')}`, inline: true}
        )

    message.channel.send(embed)
}

module.exports.config = 
{
    desc: "Displays a list of all your command cooldowns.",
    command: "cooldown",
    aliases: ["cd"],
    category: "tools",
}