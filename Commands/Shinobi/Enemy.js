const Discord = require('discord.js')
const {titleCase} = require('../../Util/utils')

module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start
    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))

    let shinobi = bot.set.shinobi
    let crank = shinobi.crank
    let brank = shinobi.brank
    let arank = shinobi.arank
    let srank = shinobi.srank

    if (!args[0]){
        let defeatedenemies = bot.rpg.get(message.author.id).defeatedenemies
        let enemyC = crank.map(o => `**${o.level}.** ‎${o.name} ${defeatedenemies.includes(o.name) ? `${bot.set.check}` : '❌'}`)
        let enemyB = brank.map(o => `**${o.level}.** ‎ ‎${o.name} ${defeatedenemies.includes(o.name) ? `${bot.set.check}` : '❌'}`)
        let enemyA = arank.map(o => `**${o.level}.** ‎ ‎${o.name} ${defeatedenemies.includes(o.name) ? `${bot.set.check}` : '❌'}`)
        let enemyS = srank.map(o => `**${o.level}.** ‎ ‎${o.name} ${defeatedenemies.includes(o.name) ? `${bot.set.check}` : '❌'}`)
        
        const embed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setThumbnail('https://i.ibb.co/Csv4YQd/Scroll.png')
            .setTitle(`Enemy List`)
            .setFooter(`Type $enemy [name] to get information on a specific enemy.`)
            .addFields(
                {name: `C-Rank Enemies`, value: `${enemyC.join(`\n`)}`, inline: true},
                {name: `B-Rank Enemies`, value: `${enemyB.join(`\n`)}`, inline: true},
                {name: `A-Rank Enemies`, value: `${enemyA.join(`\n`)}`, inline: true},
                {name: `S-Rank Enemies`, value: `${enemyS.join(`\n`)}`, inline: true}
            )
        
        return message.channel.send(embed)
    }

    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')

    function cRankEnemy(){
        embed.setTitle(crank[number].name)
        embed.setThumbnail(crank[number].image)
        embed.setDescription(`
${bot.set.bulletin} **Rank:** C
${bot.set.bulletin} **Level:** ${crank[number].level}
♥ **Health:** ${crank[number].health.toLocaleString()}
⚔ **Power:** ${crank[number].power.toLocaleString()}

${crank[number].description}
        `)
        message.channel.send(embed)
    }
    function bRankEnemy(){
        embed.setTitle(brank[number].name)
        embed.setThumbnail(brank[number].image)
        embed.setDescription(`
${bot.set.bulletin} **Rank:** B
${bot.set.bulletin} **Level:** ${brank[number].level}
♥ **Health:** ${brank[number].health.toLocaleString()}
⚔ **Power:** ${brank[number].power.toLocaleString()}

${brank[number].description}
        `)
        message.channel.send(embed)
    }
    function aRankEnemy(){
        embed.setTitle(arank[number].name)
        embed.setThumbnail(arank[number].image)
        embed.setDescription(`
${bot.set.bulletin} **Rank:** A
${bot.set.bulletin} **Level:** ${arank[number].level}
♥ **Health:** ${arank[number].health.toLocaleString()}
⚔ **Power:** ${arank[number].power.toLocaleString()}

${arank[number].description}
        `)
        message.channel.send(embed)
    }
    function sRankEnemy(){
        embed.setTitle(srank[number].name)
        embed.setThumbnail(srank[number].image)
        embed.setDescription(`
${bot.set.bulletin} **Rank:** S
${bot.set.bulletin} **Level:** ${srank[number].level}
♥ **Health:** ${srank[number].health.toLocaleString()}
⚔ **Power:** ${srank[number].power.toLocaleString()}

${srank[number].description}
        `)
        message.channel.send(embed)
    }

    if (crank.some(item => item.name === titleCase(args[0]))){
        number = crank.findIndex(item => item.name === titleCase(args[0]))
        cRankEnemy()
    }
    else if (brank.some(item => item.name === titleCase(args[0]))){
        number = brank.findIndex(item => item.name === titleCase(args[0]))
        bRankEnemy()
    }
    else if (arank.some(item => item.name === titleCase(args[0]))){
        number = arank.findIndex(item => item.name === titleCase(args[0]))
        aRankEnemy()
    }
    else if (srank.some(item => item.name === titleCase(args[0]))){
        number = srank.findIndex(item => item.name === titleCase(args[0]))
        sRankEnemy()
    }
    else
        return message.channel.send(bot.failEmbed(`❌ The enemy you provided does not exist!`, message.author))
}

module.exports.config = 
{
    desc: "Checks a list of enemies that appears in missions and their respective stats.",
    usage: "<name>",
    command: "enemy",
    category: "shinobi",
    cooldown: 0,
}