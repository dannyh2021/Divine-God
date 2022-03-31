const Discord = require('discord.js')
const { generateCode, generateCharacter } = require('../Util/utils.js')
const { titleCase } = require('../Util/utils.js')
const Canvas = require('canvas')
const { Emoji } = require('discord.js')

let background
async function loadImages(){
    background = await Canvas.loadImage('https://i.ibb.co/rHTqL5r/Ryo-Drop.png')
}
loadImages()

module.exports = async (bot, message) => 
{
    let prefix = bot.config.prefix
    let ch = message.channel.id
    let userID = message.author.id
    let data = bot.eco.get(userID)
    let second = 1000
    let minute = second * 60
    let hour = minute * 60

    if (message.author.bot)
        return

    bot.eco.add(`${message.author.id}.messages`, 1)
        
    if(!bot.talkedRecently.has(userID)){//Chat Money
        bot.talkedRecently.add(userID)
        bot.eco.add(`${message.author.id}.balance`, Math.floor(Math.random() * 6 + 5))
        setTimeout(() => {
            bot.talkedRecently.delete(userID)
        }, 60000)
    }

    if(!bot.set.drops.blacklist.includes(ch)){//Energy Drops
        let chIndex = bot.set.drops.channels.findIndex(ch => ch.id == message.channel.id)
        if(chIndex == -1){
            if(bot.drops.has(ch)){
                let curMsg = bot.drops.get(ch)
                bot.drops.set(ch, curMsg - 1)
            }
            else{
                bot.drops.set(ch, bot.set.drops.dropRate - 1)
            }
        }
        else{
            if(bot.drops.has(ch)){
                let curMsg = bot.drops.get(ch)
                bot.drops.set(ch, curMsg - 1)
            }
            else{
                bot.drops.set(ch, bot.set.drops.channels[chIndex].dropRate - 1)
            }
        }
    
        if(bot.drops.get(ch) <= 0){
            let code = generateCode(7, false)
    
            const canvas = Canvas.createCanvas(700, 750)
            const ctx = canvas.getContext('2d')
            
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        
            function drawStroked2(text, x, y){   
                ctx.font = 'bold 85px Arial'
                ctx.strokeStyle = 'BLACK'
                ctx.lineWidth = 15
                ctx.strokeText(text, x, y)
                ctx.fillStyle = 'WHITE'
                ctx.fillText(text, x, y)
            }
            drawStroked2(code.toUpperCase(), 125, 697)
                
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "drops.png");
            const msgembed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setTitle(`${bot.set.currency} Ryo Drop`)
                .setDescription(`Type **\`$claim [code]\`** to claim the ryo drop!`)
                .setColor('00e3ff')
                .setImage('attachment://drops.png')
    
            message.channel.send(msgembed)
                
    
            bot.drops.set(`${ch}_code`, code);
            bot.drops.set(ch, 250)
            
        }
    }

    if (message.content.startsWith(prefix)){//Command runner
        let cmd = require('./subEvents/command.js')
        cmd.run(bot, message, prefix)
    }

    let start = data.start

    if (start == 1){
        let weekly = bot.set.weekly
        if (weekly.status == 'on'){
            bot.eco.add(`${message.author.id}.points`, 1)
            let points = bot.eco.get(userID).points
            if (points  == 5000){
                bot.eco.add(`${message.author.id}.balance`, weekly.ryoAward)
                bot.rpg.add(`${message.author.id}.experience`, weekly.xpAward)
                message.channel.send(`${message.author}`, {embed: bot.embed(`
Congratulations, you have sent a total of **5,000** messages in this server and completed the weekly mission!

**Rewards:**
\u2001• ${weekly.ryoAward.toLocaleString()} ryo
\u2001• ${weekly.xpAward.toLocaleString()} experience`
                , message.author)})
            }
        }
        let rpgData = bot.rpg.get(userID)
        let balance = bot.eco.get(userID).balance
        let experience = rpgData.experience
        let level = rpgData.level
        let health = rpgData.health
        let critical=rpgData.critical
        let mysterybox = rpgData.mysterybox
        
        if (message.channel.id == 954358378707156993 || message.channel.id == 955684987502465044){
            let boxChance = Math.floor(Math.random() * 100)
            if (boxChance == 0){
                bot.rpg.add(`${message.author.id}.mysterybox`, 1)
                const embed = new Discord.MessageEmbed()
                    .setColor('00e3ff')
                    .setTitle(`Mystery Box!`)
                    .setThumbnail(`https://i.ibb.co/C5cHRMs/Mystery-Box.jpg`)
                    .setDescription(`You have found a mystery box! Use **\`$mystery\`** to open it and obtain its contents!`)
                message.channel.send(`${message.author}`, {embed: embed})
            }
        }

        if (level < 30){//D+C Rank Leveling
            healthAmount = Math.floor(Math.random() * 11 + 20)
            powerAmount = Math.floor(Math.random() * 5 + 3)
        }
        else if (level < 50){
            healthAmount = Math.floor(Math.random() * 11 + 30)
            powerAmount = Math.floor(Math.random() * 4 + 7)
        }
        else if (level < 100){
            healthAmount = Math.floor(Math.random() * 21 + 40)
            powerAmount = Math.floor(Math.random() * 6 + 10)
        }
         
        function getPowerBooster(){
            let shop = bot.set.shop
            let weapon = bot.rpg.get(message.author.id).weapon
            let attack = bot.rpg.get(message.author.id).power
            if (weapon == 'None'){
                itemPower = 0
            }
            else{
                number = shop.weapon.findIndex(item => item.name === weapon)
                itemPower = shop.weapon[number].power
            }
            power = attack + itemPower
        }
        function levelUp(){
            getPowerBooster()
            bot.rpg.set(`${message.author.id}.level`, level + 1)
            bot.rpg.add(`${message.author.id}.health`, healthAmount)
            bot.rpg.add(`${message.author.id}.power`, powerAmount)
            bot.rpg.add(`${message.author.id}.mysterybox`, 1)
            levelEmbed.setDescription(`
You have leveled up to Level **${level + 1}**!

**Rewards**
♥ **${health.toLocaleString()} 🡆 ${(health + healthAmount).toLocaleString()}** (+${healthAmount})
⚔ **${power.toLocaleString()} 🡆 ${(power + powerAmount).toLocaleString()}** (+${powerAmount})
📦 **${mysterybox} 🡆 ${mysterybox + 1}** (+1)
    `)
            message.channel.send(levelEmbed) 
        }
        
        const levelEmbed = new Discord.MessageEmbed()
            .setColor('00e3ff')
            .setThumbnail(message.author.avatarURL({dynamic: true}))
            .setTitle('Level Up!')

        if (experience > 99 && level == 1){
            levelUp()
        }
        else if (experience > 359 && level == 2){
            levelUp()
        }
        else if (experience > 759 && level == 3){
            levelUp()
        }
        else if (experience > 1299 && level == 4){
            levelUp()
        }
        else if (experience > 1979 && level == 5){
            levelUp()
        }
        else if (experience > 2799 && level == 6){
            levelUp()
        }
        else if (experience > 3759 && level == 7){
            levelUp()
        }
        else if (experience > 4859 && level == 8){
            levelUp()
        }
        else if (experience > 6099 && level == 9){
            getPowerBooster()
            bot.rpg.set(`${message.author.id}.level`, 10)
            bot.rpg.set(`${message.author.id}.rank`, "C")
            bot.rpg.add(`${message.author.id}.health`, healthAmount)
            bot.rpg.add(`${message.author.id}.power`, powerAmount)
            bot.rpg.add(`${message.author.id}.mysterybox`, 2) 
            bot.rpg.add(`${message.author.id}.critical`, 5)
            bot.eco.add(`${message.author.id}.balance`, 3000)

            
            levelEmbed.setDescription(`
You have leveled up to Level **${level + 1}**!
You have also ranked up to a **C Class Shinobi**!

**Overview**
♥ **${health} 🡆 ${health + healthAmount}** (+${healthAmount})
⚔ **${power} 🡆 ${power + powerAmount}** (+${powerAmount})
📦 **${mysterybox} 🡆 ${mysterybox + 2}** (+2)
${bot.set.currency} **${balance.toLocaleString()} 🡆 ${(balance + 3000).toLocaleString()}** (+3,000)
${bot.set.critical} **${critical}% 🡆 ${critical + 5}%** (+5%)
    `)
            message.channel.send(levelEmbed)
        }
        else if (experience > 7479 && level == 10){
            levelUp()
        }
        else if (experience > 8999 && level == 11){
           levelUp()
        }
        else if (experience > 10659 && level == 12){
            levelUp()
        }
        else if (experience > 12459 && level == 13){
            levelUp()
        }
        else if (experience > 14399 && level == 14){
            levelUp()
        }
        else if (experience > 16479 && level == 15){
            levelUp()
        }
        else if (experience > 18699 && level == 16){
            levelUp()
        }
        else if (experience > 21059 && level == 17){
            levelUp()
        }
        else if (experience > 23559 && level == 18){
            levelUp()
        }
        else if (experience > 26199 && level == 19){
            levelUp()
        }
        else if (experience > 28979 && level == 20){
            levelUp()
        }
        else if (experience > 31899 && level == 21){
            levelUp()
        }
        else if (experience > 34959 && level == 22){
            levelUp()
        }
        else if (experience > 38159 && level == 23){
            levelUp()
        }
        else if (experience > 41499 && level == 24){
            levelUp()
        }
        else if (experience > 44979 && level == 25){
            levelUp()
        }
        else if (experience > 48599 && level == 26){
            levelUp()
        }
        else if (experience > 52359 && level == 27){
            levelUp()
        }
        else if (experience > 56259 && level == 28){
            levelUp()
        }
        else if (experience > 60299 && level == 29){
            getPowerBooster()
            bot.rpg.set(`${message.author.id}.level`, 30)
            bot.rpg.set(`${message.author.id}.rank`, "B")
            bot.rpg.add(`${message.author.id}.health`, healthAmount)
            bot.rpg.add(`${message.author.id}.power`, powerAmount)  
            bot.rpg.add(`${message.author.id}.mysterybox`, 5)
            bot.rpg.add(`${message.author.id}.critical`, 5)
            bot.eco.add(`${message.author.id}.balance`, 10000)
            
            levelEmbed.setDescription(`
You have leveled up to Level **${level + 1}**!
You have also ranked up to a **B Class Shinobi**!

**Overview**
♥ **${health} 🡆 ${health + healthAmount}** (+${healthAmount})
⚔ **${power} 🡆 ${power + powerAmount}** (+${powerAmount})
📦 **${mysterybox} 🡆 ${mysterybox + 5}** (+5)
${bot.set.currency} **${balance.toLocaleString()} 🡆 ${(balance + 10000).toLocaleString()}** (+10,000)
${bot.set.critical} **${critical}% 🡆 ${critical + 5}%** (+5%)
    `)
            message.channel.send(levelEmbed)
        }
        else if (experience > 64479 && level == 30){
            levelUp()
        }
        else if (experience > 68799 && level == 31){
            levelUp()
        }
        else if (experience > 73259 && level == 32){
            levelUp()
        }
        else if (experience > 77859 && level == 33){
            levelUp()
        }
        else if (experience > 82599 && level == 34){
            levelUp()
        }
        else if (experience > 87479 && level == 35){
            levelUp()
        }
        else if (experience > 92499 && level == 36){
            levelUp()
        }
        else if (experience > 97659 && level == 37){
            levelUp()
        }
        else if (experience > 102959 && level == 38){
            levelUp()
        }
        else if (experience > 108399 && level == 39){
            levelUp()
        }
        else if (experience > 113979 && level == 40){
            levelUp()
        }
        else if (experience > 119699 && level == 41){
            levelUp()
        }
        else if (experience > 125559 && level == 42){
            levelUp()
        }
        else if (experience > 131559 && level == 43){
            levelUp()
        }
        else if (experience > 137699 && level == 44){
            levelUp()
        }
        else if (experience > 143979 && level == 45){
            levelUp()
        }
        else if (experience > 150399 && level == 46){
            levelUp()
        }
        else if (experience > 156959 && level == 47){
            levelUp()
        }
        else if (experience > 163659 && level == 48){
            levelUp()
        }
        else if (experience > 170499 && level == 49){
            getPowerBooster()
            bot.rpg.set(`${message.author.id}.level`, 50)
            bot.rpg.set(`${message.author.id}.rank`, "A")
            bot.rpg.add(`${message.author.id}.health`, healthAmount)
            bot.rpg.add(`${message.author.id}.power`, powerAmount)  
            bot.rpg.add(`${message.author.id}.mysterybox`, 10)
            bot.rpg.add(`${message.author.id}.critical`, 5)
            bot.eco.add(`${message.author.id}.balance`, 25000)
            
            levelEmbed.setDescription(`
You have leveled up to Level **${level + 1}**!
You have also ranked up to an **A Class Shinobi**!

**Overview**
♥ **${health} 🡆 ${health + healthAmount}** (+${healthAmount})
⚔ **${power} 🡆 ${power + powerAmount}** (+${powerAmount})
📦 **${mysterybox} 🡆 ${mysterybox + 10}** (+10)
${bot.set.currency} **${balance.toLocaleString()} 🡆 ${(balance + 25000).toLocaleString()}** (+25,000)
${bot.set.critical} **${critical}% 🡆 ${critical + 5}%** (+5%)
    `)
            message.channel.send(levelEmbed)
        }
        else if (experience > 177479 && level == 50){
            levelUp()
        }
        else if (experience > 184599 && level == 51){
            levelUp()
        }
        else if (experience > 191859 && level == 52){
            levelUp()
        }
        else if (experience > 199259 && level == 53){
            levelUp()
        }
        else if (experience > 206799 && level == 54){
            levelUp()
        }
        else if (experience > 214479 && level == 55){
            levelUp()
        }
        else if (experience > 222299 && level == 56){
            levelUp()
        }
        else if (experience > 230259 && level == 57){
            levelUp()
        }
        else if (experience > 238359 && level == 58){
            levelUp()
        }
        else if (experience > 246599 && level == 59){
            levelUp()
        }
        else if (experience > 254979 && level == 60){
            levelUp()
        }
        else if (experience > 263499 && level == 61){
            levelUp()
        }
        else if (experience > 272159 && level == 62){
            levelUp()
        }
        else if (experience > 280959 && level == 63){
            levelUp()
        }
        else if (experience > 289899 && level == 64){
            levelUp()
        }
        else if (experience > 298979 && level == 65){
            levelUp()
        }
        else if (experience > 308199 && level == 66){
            levelUp()
        }
        else if (experience > 317559 && level == 67){
            levelUp()
        }
        else if (experience > 327059 && level == 68){
            levelUp()
        }
        else if (experience > 336699 && level == 69){
            levelUp()
        }
        else if (experience > 346479 && level == 70){
            levelUp()
        }
        else if (experience > 356399 && level == 71){
            levelUp()
        }
        else if (experience > 366459 && level == 72){
            levelUp()
        }
        else if (experience > 376659 && level == 73){
            levelUp()
        }
        else if (experience > 386999 && level == 74){
            levelUp()
        }
        else if (experience > 397479 && level == 75){
            levelUp()
        }
        else if (experience > 408099 && level == 76){
            levelUp()
        }
        else if (experience > 418859 && level == 77){
            levelUp()
        }
        else if (experience > 429759 && level == 78){
            levelUp()
        }
        else if (experience > 440799 && level == 79){
            levelUp()
        }
        else if (experience > 451979 && level == 80){
            levelUp()
        }
        else if (experience > 463299 && level == 81){
            levelUp()
        }
        else if (experience > 474759 && level == 82){
            levelUp()
        }
        else if (experience > 486359 && level == 83){
            levelUp()
        }
        else if (experience > 498099 && level == 84){
            levelUp()
        }
        else if (experience > 509979 && level == 85){
            levelUp()
        }
        else if (experience > 521999 && level == 86){
            levelUp()
        }
        else if (experience > 534159 && level == 87){
            levelUp()
        }
        else if (experience > 546459 && level == 88){
            levelUp()
        }
        else if (experience > 558899 && level == 89){
            levelUp()
        }
        else if (experience > 571479 && level == 90){
            levelUp()
        }
        else if (experience > 584199 && level == 91){
            levelUp()
        }
        else if (experience > 597059 && level == 92){
            levelUp()
        }
        else if (experience > 610059 && level == 93){
            levelUp()
        }
        else if (experience > 623199 && level == 94){
            levelUp()
        }
        else if (experience > 636479 && level == 95){
            levelUp()
        }
        else if (experience > 649899 && level == 96){
            levelUp()
        }
        else if (experience > 663459 && level == 97){
            levelUp()
        }
        else if (experience > 677159 && level == 98){
            levelUp()
        }
        else if (experience > 690999 && level == 99){
            getPowerBooster()
             bot.rpg.set(`${message.author.id}.level`, 100)
            bot.rpg.set(`${message.author.id}.rank`, "S")
            bot.rpg.add(`${message.author.id}.health`, healthAmount)
            bot.rpg.add(`${message.author.id}.power`, powerAmount)  
            bot.rpg.add(`${message.author.id}.mysterybox`, 20)
            bot.rpg.add(`${message.author.id}.critical`, 5)
            bot.eco.add(`${message.author.id}.balance`, 50000)
            
            levelEmbed.setDescription(`
You have leveled up to Level **${level + 1}**!
You have also ranked up to an **S Class Shinobi**!

**Overview**
♥ **${health} 🡆 ${health + healthAmount}** (+${healthAmount})
⚔ **${power} 🡆 ${power + powerAmount}** (+${powerAmount})
📦 **${mysterybox} 🡆 ${mysterybox + 20}** (+20)
${bot.set.currency} **${balance.toLocaleString()} 🡆 ${(balance + 50000).toLocaleString()}** (+50,000)
${bot.set.critical} **${critical}% 🡆 ${critical + 5}%** (+5%)
    `)
            message.channel.send(levelEmbed)
        
        }

        else if (experience > 704979 && level == 100){
            levelUp()
        }
        else if (experience > 719099 && level == 101){
            levelUp()
        }
        else if (experience > 733359 && level == 102){
            levelUp()
        }
        else if (experience > 747759 && level == 103){
            levelUp()
        }
        else if (experience > 762299 && level == 104){
            levelUp()
        }
        else if (experience > 776979 && level == 105){
            levelUp()
        }
        else if (experience > 791799 && level == 106){
            levelUp()
        }
        else if (experience > 806759 && level == 107){
            levelUp()
        }
        else if (experience > 821859 && level == 108){
            levelUp()
        }
        else if (experience > 837099 && level == 109){
            levelUp()
        }
        else if (experience > 852479 && level == 110){
            levelUp()
        }
        else if (experience > 867999 && level == 111){
            levelUp()
        }
        else if (experience > 883659 && level == 112){
            levelUp()
        }
        else if (experience > 899459 && level == 113){
            levelUp()
        }
        else if (experience > 915399 && level == 114){
            levelUp()
        }
        else if (experience > 931479 && level == 115){
            levelUp()
        }
        else if (experience > 947699 && level == 116){
            levelUp()
        }
        else if (experience > 964059 && level == 117){
            levelUp()
        }
        else if (experience > 980559 && level == 118){
            levelUp()
        }
        else if (experience > 997199 && level == 119){
            levelUp()
        }
        else if (experience > 1013979 && level == 120){
            levelUp()
        }
        else if (experience > 1030899 && level == 121){
            levelUp()
        }
        else if (experience > 1047959 && level == 122){
            levelUp()
        }
        else if (experience > 1065159 && level == 123){
            levelUp()
        }
        else if (experience > 1082499 && level == 124){
            levelUp()
        }
        else if (experience > 1099979 && level == 125){
            levelUp()
        }
        else if (experience > 1117599 && level == 126){
            levelUp()
        }
        else if (experience > 1135359 && level == 127){
            levelUp()
        }
        else if (experience > 1153259 && level == 128){
            levelUp()
        }
        else if (experience > 1171299 && level == 129){
            levelUp()
        }
        else if (experience > 1189479 && level == 130){
            levelUp()
        }
        else if (experience > 1207799 && level == 131){
            levelUp()
        }
        else if (experience > 1226259 && level == 132){
            levelUp()
        }
        else if (experience > 1244859 && level == 133){
            levelUp()
        }
        else if (experience > 1263599 && level == 134){
            levelUp()
        }
        else if (experience > 1282479 && level == 135){
            levelUp()
        }
        else if (experience > 1301499 && level == 136){
            levelUp()
        }
        else if (experience > 1320659 && level == 137){
            levelUp()
        }
        else if (experience > 1339959 && level == 138){
            levelUp()
        }
        else if (experience > 1359399 && level == 139){
            levelUp()
        }
        else if (experience > 1378979 && level == 140){
            levelUp()
        }
        else if (experience > 1398699 && level == 141){
            levelUp()
        }
        else if (experience > 1418559 && level == 142){
            levelUp()
        }
        else if (experience > 1438559 && level == 143){
            levelUp()
        }
        else if (experience > 1458699 && level == 144){
            levelUp()
        }
        else if (experience > 1478979 && level == 145){
            levelUp()
        }
        else if (experience > 1499399 && level == 146){
            levelUp()
        }
        else if (experience > 1519959 && level == 147){
            levelUp()
        }
        else if (experience > 1540659 && level == 148){
            levelUp()
        }
        else if (experience > 1561499 && level == 149){
            getPowerBooster()
             bot.rpg.set(`${message.author.id}.level`, 150)
            bot.rpg.set(`${message.author.id}.rank`, "SS")
            bot.rpg.add(`${message.author.id}.health`, healthAmount)
            bot.rpg.add(`${message.author.id}.power`, powerAmount)  
            bot.rpg.add(`${message.author.id}.mysterybox`, 50)
            bot.rpg.add(`${message.author.id}.critical`, 5)
            bot.eco.add(`${message.author.id}.balance`, 100000)
            
            levelEmbed.setDescription(`
You have leveled up to Level **${level + 1}**!
You have also ranked up to an **SS Class Shinobi**!

**Overview**
♥ **${health} 🡆 ${health + healthAmount}** (+${healthAmount})
⚔ **${power} 🡆 ${power + powerAmount}** (+${powerAmount})
📦 **${mysterybox} 🡆 ${mysterybox + 50}** (+50)
${bot.set.currency} **${balance.toLocaleString()} 🡆 ${(balance + 100000).toLocaleString()}** (+100,000)
${bot.set.critical} **${critical}% 🡆 ${critical + 5}%** (+5%)
    `)
            message.channel.send(levelEmbed)
        }


    }
}

