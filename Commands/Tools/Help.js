const Discord   = require('discord.js');
const categories = ["economy", "gaming", "money", "shinobi", "tools"]

module.exports.run = async (bot, message, args, prefix) => 
{
    let commandList

    if(!args.length){
        const commandEmbed = new Discord.MessageEmbed()
            .setTitle(`Help`)
            .setThumbnail("https://i.ibb.co/3RkWPdL/Help-Picture.png")
            .setColor("#00e3ff")
            .setDescription(`Prefix: **\`$\`**`)
            .addFields(
                {name: `Economy`, value: `💰`, inline: true},
                {name: `Money`, value: `💵`, inline: true},
                {name: `Gaming`, value: `🕹`, inline: true},
                {name: `Shinobi`, value: `${bot.set.shuriken}`, inline: true},
                {name: `Tools`, value: `⚙`, inline: true},
            )
           
        let msg = await message.channel.send(commandEmbed)
    
        msg.react('💰')
        msg.react('💵')
        msg.react('🕹')
        msg.react('954816555961700372')
        msg.react('⚙')

        const collector = msg.createReactionCollector((r, u) => u.id == message.author.id, {time: 90000})
        collector.on('collect', (reaction, user) => {
        let emoji = reaction.emoji.name
        reaction.users.remove(user.id)
        switch(emoji){
            case '💰':
                commandList = bot.commands.filter(cmd => cmd.config.category == 'economy')
                commandList = commandList.map(cmd => cmd.config.command);
                commandEmbed.setTitle(`Help - Economy`)
                commandEmbed.setDescription(`Use **\`${prefix}help [command]\`** for detailed info.\n\`\`\`\n${commandList.join(", ")} \`\`\` `)
                commandEmbed.fields = null
                msg.edit(commandEmbed)
                break

            case '💵':
                commandList = bot.commands.filter(cmd => cmd.config.category == 'money')
                commandList = commandList.map(cmd => cmd.config.command);
                commandEmbed.setTitle(`Help - Money`)
                commandEmbed.setDescription(`Use **\`${prefix}help [command]\`** for detailed info.\n\`\`\`\n${commandList.join(", ")} \`\`\` `)
                commandEmbed.fields = null
                msg.edit(commandEmbed)
                break

            case '🕹':
                commandList = bot.commands.filter(cmd => cmd.config.category == 'gaming')
                commandList = commandList.map(cmd => cmd.config.command);
                commandEmbed.setTitle(`Help - Gaming`)
                commandEmbed.setDescription(`Use **\`${prefix}help [command]\`** for detailed info.\n\`\`\`\n${commandList.join(", ")} \`\`\` `)
                commandEmbed.fields = null
                msg.edit(commandEmbed)
                break
            
            case `shuriken`:
                commandList = bot.commands.filter(cmd => cmd.config.category == 'shinobi')
                commandList = commandList.map(cmd => cmd.config.command);
                commandEmbed.setTitle(`Help - Shinobi`)
                commandEmbed.setDescription(`Use **\`${prefix}help [command]\`** for detailed info.\n\`\`\`\n${commandList.join(", ")} \`\`\` `)
                commandEmbed.fields = null
                msg.edit(commandEmbed)
                break

            case '⚙':
                commandList = bot.commands.filter(cmd => cmd.config.category == 'tools')
                commandList = commandList.map(cmd => cmd.config.command);
                commandEmbed.setTitle(`Help - Tools`)
                commandEmbed.setDescription(`Use **\`${prefix}help [command]\`** for detailed info.\n\`\`\`\n${commandList.join(", ")} \`\`\` `)
                commandEmbed.fields = null
                msg.edit(commandEmbed)
                break
        }
        })}

    if (!args.length)
        return

    const commandName = args[0].toLowerCase()
    let command

    if(bot.commands.has(commandName))
        command = bot.commands.get(commandName)

    if (!command) 
        return message.channel.send(bot.failEmbed(`❌ That is not a valid command!`, message.author))
        
    const name = commandName[0].toUpperCase() + commandName.slice(1).toLowerCase()

    if (command.config.usage)
        usageText = `${prefix}${command.config.command} ${command.config.usage}`
    else
        usageText = `${prefix}${command.config.command}`

    if (command.config.roles)
        roleText = `${command.config.roles.map(id => message.guild.roles.resolve(id)).join('\n• ')}`
    else
        roleText = 'None'

    if (isNaN(command.config.cooldown))
        cooldownText = 'None'

    else{
        hourlyValue = (command.config.cooldown / 3600).toFixed(2)
        cooldownText = `${hourlyValue || 0} hour(s)`
    }
        

     const embed = new Discord.MessageEmbed()
        .setColor("00e3ff")
        .setTitle(`Command - ${name}`)
        .setDescription(`${command.config.desc}`)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .addFields(
            {name: `Usage`, value: `${usageText}`, inline: true},
            {name: `Roles Required`, value: `${roleText}`, inline: true},
            {name: `Cooldown`, value: `${cooldownText}`, inline: true}
        )
        
    message.channel.send(embed)   
}

module.exports.config = 
{
    desc: "Displays the help menu.",
    command: "help",
    category: "tools",
}