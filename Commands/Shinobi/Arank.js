const Discord = require('discord.js')
const Canvas = require('canvas')
module.exports.run = async (bot, message, args) => 
{
    let start = bot.eco.get(message.author.id).start
    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))

    let shop = bot.set.shop
    let data = bot.rpg.get(message.author.id)
    let health = data.health
    let attack = data.power
    let critical = data.critical
    let defeatedenemies = data.defeatedenemies
    let missionstatus = data.missionstatus
    let weapon = data.weapon
    const role = message.guild.roles.cache.get('815389418051207178')
    const id = `${message.author.id}`
    const type = "member"

    if (weapon == 'None'){
        number = shop.weapon.findIndex(item => item.name === weapon)
        itemPower = 0

    }
    else{
        number = shop.weapon.findIndex(item => item.name === weapon)
        itemPower = shop.weapon[number].power
    }
    let power = attack + itemPower

    if (missionstatus == 'on')
        return message.channel.send(bot.failEmbed(`❌ Don't try to go on another mission when you are in the middle of a current mission! For that, the cooldown for this mission has started.`, message.author))

    let enemyData = bot.set.shinobi.arank//All enemies

    if (defeatedenemies.includes(enemyData[0].name))
        text1 = `${bot.set.check}`
    else
        text1 = `❌`

    if (defeatedenemies.includes(enemyData[1].name))
        text2 = `${bot.set.check}`
    else
        text2 = `❌`

    if (defeatedenemies.includes(enemyData[2].name))
        text3 = `${bot.set.check}`
    else
        text3 = `❌`

    if (defeatedenemies.includes(enemyData[3].name))
        text4 = `${bot.set.check}`
    else
        text4 = `❌`

    if (defeatedenemies.includes(enemyData[4].name))
        text5 = `${bot.set.check}`
    else
        text5 = `❌`

    if (defeatedenemies.includes(enemyData[5].name))
        text6 = `${bot.set.check}`
    else
        text6 = `❌`

    if (defeatedenemies.includes(enemyData[6].name))
        text7 = `${bot.set.check}`
    else
        text7 = `❌`
        
    if (defeatedenemies.includes(enemyData[7].name))
        text8 = `${bot.set.check}`
    else
        text8 = `❌`

    if (defeatedenemies.includes(enemyData[8].name))
        text9 = `${bot.set.check}`
    else
        text9 = `❌`

    if (defeatedenemies.includes(enemyData[9].name))
        text10 = `${bot.set.check}`
    else
        text10 = `❌`

    message.channel.updateOverwrite(role, {'SEND_MESSAGES': false})
    message.channel.updateOverwrite(message.author.id , {'SEND_MESSAGES': true})
    bot.rpg.set(`${message.author.id}.missionstatus`, "on")

    function openChannel(){
        message.channel.updateOverwrite(role, {'SEND_MESSAGES': null})
        message.channel.updateOverwrite(message.author.id , {'SEND_MESSAGES': null})
        message.channel.permissionOverwrites.find(o => o.type === type && o.id === id).delete()
        bot.rpg.set(`${message.author.id}.missionstatus`, "off")
    }

    const preEmbed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .setThumbnail('https://i.ibb.co/Csv4YQd/Scroll.png')
        .setDescription(`
Please choose an enemy you wish to fight!

**1. ${enemyData[0].name}** ${text1}
**2. ${enemyData[1].name}** ${text2}
**3. ${enemyData[2].name}** ${text3}
**4. ${enemyData[3].name}** ${text4}
**5. ${enemyData[4].name}** ${text5}
**6. ${enemyData[5].name}** ${text6}
**7. ${enemyData[6].name}** ${text7}
**8. ${enemyData[7].name}** ${text8}
**9. ${enemyData[8].name}** ${text9}
**10. ${enemyData[9].name}** ${text10}
        `)
        .setFooter('Type the number of the enemy.')

    let preMsg = await message.channel.send(preEmbed)
    let numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    let preReply = await message.channel.awaitMessages(u2 => u2.author.id === message.author.id, {time: 30000, max: 1})
    if (!preReply.first()){
        preEmbed.setColor('RED')
        preEmbed.setDescription(`❌ You did not choose an enemy to fight!`)
        preEmbed.setFooter('')
        openChannel()
        return preMsg.edit(preEmbed)
    }

    if (!numArray.includes(preReply.first().content)){
        preEmbed.setColor('RED')
        preEmbed.setDescription(`❌ You did not choose a valid enemy to fight!`)
        preEmbed.setFooter('')
        openChannel()
        return preMsg.edit(preEmbed)
    }


    let enemy = enemyData[parseFloat(preReply.first().content) - 1]

    let enemyName = enemy.name
    let enemyHealth = enemy.health
    let myHealth = health
    let enemyAttack = enemy.power
    let xpAward = enemy.xpAward
    let ryoAward = enemy.ryoAward

    preEmbed.setImage(enemy.image)
    preEmbed.setThumbnail('')
    preEmbed.setFooter('')
    preEmbed.setDescription(`You will be facing **${enemy.name}**! Type anything to begin the battle!\n\n**Stats Overview**`)
    preEmbed.spliceFields(0, 1, {name: `${message.author.username}`, value: `♥ Health: **${myHealth.toLocaleString()}**\n⚔ Power: **${power.toLocaleString()}**`, inline: true})
    preEmbed.spliceFields(2, 1, {name: `${enemy.name}`, value: `♥ Health: **${enemyHealth.toLocaleString()}**\n⚔ Power: **${enemyAttack.toLocaleString()}**`, inline: true})
    preMsg.edit(preEmbed)
    let startReply = await message.channel.awaitMessages(u2 => u2.author.id === message.author.id, {time: 30000, max: 1})
    if (!startReply.first()){
        preEmbed.setColor('RED')
        preEmbed.setDescription(`❌ You didn't start the battle!`)
        openChannel()
        return preMsg.edit(preEmbed)
    }
    preMsg.delete()

    
    const canvas = Canvas.createCanvas(1146, 636)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage('https://i.ibb.co/brppLqQ/Battle-Template-A-Rank.png')
    const avatar = await Canvas.loadImage(message.author.avatarURL({format: 'jpg'}))
    const enemyImage = await Canvas.loadImage(enemy.image)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(avatar, 52, 159, 312, 312)
    ctx.drawImage(enemyImage, 792, 159, 312, 312)
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "arank.jpg")

    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .attachFiles(attachment)
        .setImage('attachment://arank.jpg')

    let msg = await message.channel.send(embed)

    function fieldSplice(){
        embed.spliceFields(0, 1, {name: `${message.author.username}`, value: `♥ ${myHealth.toLocaleString()}`, inline: true})
        embed.spliceFields(1, 1, {name: `‎`, value: `‎`, inline: true})
        embed.spliceFields(2, 1, {name: `${enemy.name}`, value: `♥ ${enemyHealth.toLocaleString()}`, inline: true})
    }

    while (myHealth > 0 && enemyHealth > 0){
        embed.setColor('00e3ff')
        embed.setDescription(`Please type **attack** to attack your enemy!`)
        fieldSplice()
        msg.edit(embed)
        reply = await message.channel.awaitMessages(u2 => u2.author.id === message.author.id, {time: 5000, max: 1})
        let myAttackRange = Math.floor(power * 0.2)
        let enemyAttackRange = Math.floor(enemyAttack * 0.2)
        
        myAttack = Math.floor(Math.random() * myAttackRange + (0.9 * power)) 
        criticalChance = Math.ceil(Math.random() * 100)
        if (criticalChance < (critical + 1)){
            myAttack = myAttack * 2
            attackText = `${bot.set.critical} **CRITICAL!** You attacked **${enemy.name}** and dealt **${myAttack}** damage!`
        }
        else{
            myAttack = myAttack
            attackText = `⚔ You attacked **${enemy.name}** and dealt **${myAttack}** damage!`
        }
        enAttack = Math.floor(Math.random() * enemyAttackRange + (0.9 * enemyAttack)) 
    
        if (!reply.first()){//What happens if user does not enter anything
            embed.setDescription(`You did not attack your enemy!`)
            embed.setColor('580606')
            fieldSplice()
            msg.edit(embed)
        }
        else if (reply.first().content.toLowerCase() != 'attack' && reply.first().content.toLowerCase() != 'atk' ){//What happens if the user doesn't enter "attack"
            embed.setDescription(`You did not attack your enemy!`)
            embed.setColor('580606')
            fieldSplice()
            msg.edit(embed)
    
        }
        else{
            enemyHealth -= myAttack
            if (enemyHealth < 1){//Wining battle condition
                enemyHealth = 0
                embed.setColor('GREEN')
                embed.setDescription(attackText)
                fieldSplice()
                msg.edit(embed)
                await bot.sleep(3000)
                embed.setColor('00e3ff')
                bot.rpg.add(`${message.author.id}.arank`, 1)
                if (!defeatedenemies.includes(enemyName)){
                    bot.rpg.push(`${message.author.id}.defeatedenemies`, enemyName)
                    bot.rpg.add(`${message.author.id}.experience`, xpAward * 2)
                    bot.eco.add(`${message.author.id}.balance`, ryoAward * 2)
                    embed.setDescription(`You have defeated **${enemy.name}** for the first time!\n\nYou have completed this **A Rank Mission** and have been awarded with the following:\n• **${xpAward * 2}** experience\n• **${ryoAward * 2}** ryo`)
                    openChannel()
                    return msg.edit(embed)
                }
                bot.rpg.add(`${message.author.id}.experience`, xpAward)
                bot.eco.add(`${message.author.id}.balance`, ryoAward)
                embed.setDescription(`You have defeated **${enemy.name}**!\n\nYou have completed this **A Rank Mission** and have been awarded with the following:\n• **${xpAward}** experience\n• **${ryoAward}** ryo`)
                openChannel()
                return msg.edit(embed)
            }
            else{//Normal attack 
                embed.setColor('GREEN')
                embed.setDescription(attackText)
                fieldSplice()
                msg.edit(embed)
            }
        }

        await bot.sleep(3000)

        myHealth -=enAttack
        if (myHealth < 0){//Losing battle condition
            myHealth = 0
            embed.setColor('RED')
            embed.setDescription(`⚔ **${enemy.name}** attacked you and dealt **${enAttack}** damage!`)
            fieldSplice()
            msg.edit(embed)
            await bot.sleep(3000)
            embed.setDescription(`❌ You have lost the battle against **${enemy.name}**!`)
            openChannel()
            return msg.edit(embed)
        }
        else{//Normal receiving attack
            embed.setColor('RED')
            embed.setDescription(`⚔ **${enemy.name}** attacked you and dealt **${enAttack}** damage!`)
            fieldSplice()
            msg.edit(embed)
        }
        await bot.sleep(3000)
    }
}

module.exports.config = 
{
    desc: "Go on an A-Rank Mission",
    command: "arank",
    category: "shinobi",
    cooldown: 3600
}