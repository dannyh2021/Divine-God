const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start
    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))

    let mysterybox = bot.rpg.get(message.author.id).mysterybox
    let randomChance = Math.floor(Math.random() * 5)
    let randomHealth = Math.ceil(Math.random() * 10)
    let randomAttack = Math.ceil(Math.random() * 5)
    let randomRyo = Math.floor(Math.random() * 401 + 100)
    let health = bot.rpg.get(message.author.id).health
    let attack = bot.rpg.get(message.author.id).power

    if (mysterybox == 0)
        return message.channel.send(bot.failEmbed(`❌ You do not have any mystery boxes right now!`, message.author))

    bot.rpg.subtract(`${message.author.id}.mysterybox`, 1)

    const embed = new Discord.MessageEmbed()    
        .setColor('00e3ff')
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .setThumbnail('https://media2.giphy.com/media/9TIGbYYpad42P7YJYx/200w.gif')
        .setDescription(`Opening the mystery box...`)

    let msg = await message.channel.send(embed)
    await bot.sleep(3000)

    if (randomChance == 0){
        bot.rpg.add(`${message.author.id}.health`, randomHealth)
        embed.setDescription(`♥ You have opened the mystery box and gained **+${randomHealth}** Health!\n♥ **${health} 🡆 ${health + randomHealth}**`)
        return msg.edit(embed)
    }
    else if (randomChance == 1){
        bot.rpg.add(`${message.author.id}.power`, randomAttack)
        embed.setDescription(`⚔ You have opened the mystery box and gained **+${randomAttack}** Power!\n⚔ **${attack} 🡆 ${attack + randomAttack}**`)
        return msg.edit(embed)
    }
    else{
        bot.eco.add(`${message.author.id}.balance`, randomRyo)
        embed.setDescription(`${bot.set.currency} You have opened the mystery box and gained **${randomRyo}** ryo!`)
        return msg.edit(embed)
    }
}

module.exports.config = 
{
    desc: "Open a mystery box",
    command: "mystery",
    category: "shinobi",
}