const Discord = require('discord.js')
const Canvas = require('canvas')
const {titleCase} = require('../../Util/utils')

module.exports.run = async (bot, message, args) => 
{
   
    let start = bot.eco.get(message.author.id).start

    if (start == 0)
        return message.channel.send(bot.failEmbed(`❌ You have not started RPG with us yet! Please use \`$start\` to start your adventure with us!`, message.author))

    let member = message.mentions.members.first() || message.member

    if (member){
        if (member.user.bot)
            return

        let userStart = bot.eco.get(member.id).start
        if (userStart == 0)
            return message.channel.send(bot.failEmbed(`❌ This user is not a shinobi!`, message.author))
    }

    let data = bot.rpg.get(member.id)
    let shop = bot.set.shop

    let uRoles = member.roles.cache

    let experience = data.experience
    let level = data.level
    let health = data.health
    let power = data.power
    let critical = data.critical
    let rank = data.rank
    let drank = data.drank
    let crank = data.crank
    let brank = data.brank
    let arank = data.arank
    let srank = data.srank
    let ssrank = data.ssrank
    let train = data.train
    let weapon = data.weapon

  


    let levelArray = [
        {level: 1, min: 000,max: 100},
        {level: 2, min: 100,max: 360},
        {level: 3, min: 360,max: 760},
        {level: 4, min: 760,max: 1300},
        {level: 5, min: 1300,max: 1980},
        {level: 6, min: 1980,max: 2800},
        {level: 7, min: 2800,max: 3760},
        {level: 8, min: 3760,max: 4860},
        {level: 9, min: 4860,max: 6100},
        {level: 10, min: 6100,max: 7480},
        {level: 11, min: 7480,max: 9000},
        {level: 12, min: 9000,max: 10660},
        {level: 13, min: 10660,max: 12460},
        {level: 14, min: 12460,max: 14400},
        {level: 15, min: 14400,max: 16480},
        {level: 16, min: 16480,max: 18700},
        {level: 17, min: 18700,max: 21060},
        {level: 18, min: 21060,max: 23560},
        {level: 19, min: 23560,max: 26200},
        {level: 20, min: 26200,max: 28980},
        {level: 21, min: 28980,max: 31900},
        {level: 22, min: 31900,max: 34960},
        {level: 23, min: 34960,max: 38160},
        {level: 24, min: 38160,max: 41500},
        {level: 25, min: 41500,max: 44980},
        {level: 26, min: 44980,max: 48600},
        {level: 27, min: 48600,max: 52360},
        {level: 28, min: 52360,max: 56260},
        {level: 29, min: 56260,max: 60300},
        {level: 30, min: 60300,max: 64480},
        {level: 31, min: 64480,max: 68800},
        {level: 32, min: 68800,max: 73260},
        {level: 33, min: 73260,max: 77860},
        {level: 34, min: 77860,max: 82600},
        {level: 35, min: 82600,max: 87480},
        {level: 36, min: 87480,max: 92500},
        {level: 37, min: 92500,max: 97660},
        {level: 38, min: 97660,max: 102960},
        {level: 39, min: 102960,max: 108400},
        {level: 40, min: 108400,max: 113980},
        {level: 41, min: 113980,max: 119700},
        {level: 42, min: 119700,max: 125560},
        {level: 43, min: 125560,max: 131560},
        {level: 44, min: 131560,max: 137700},
        {level: 45, min: 137700,max: 143980},
        {level: 46, min: 143980,max: 150400},
        {level: 47, min: 150400,max: 156960},
        {level: 48, min: 156960,max: 163660},
        {level: 49, min: 163660,max: 170500},
        {level: 50, min: 170500,max: 177480},
        {level: 51, min: 177480,max: 184600},
        {level: 52, min: 184600,max: 191860},
        {level: 53, min: 191860,max: 199260},
        {level: 54, min: 199260,max: 206800},
        {level: 55, min: 206800,max: 214480},
        {level: 56, min: 214480,max: 222300},
        {level: 57, min: 222300,max: 230260},
        {level: 58, min: 230260,max: 238360},
        {level: 59, min: 238360,max: 246600},
        {level: 60, min: 246600,max: 254980},
        {level: 61, min: 254980,max: 263500},
        {level: 62, min: 263500,max: 272160},
        {level: 63, min: 272160,max: 280960},
        {level: 64, min: 280960,max: 289900},
        {level: 65, min: 289900,max: 298980},
        {level: 66, min: 298980,max: 308200},
        {level: 67, min: 308200,max: 317560},
        {level: 68, min: 317560,max: 327060},
        {level: 69, min: 327060,max: 336700},
        {level: 70, min: 336700,max: 346480},
        {level: 71, min: 346480,max: 356400},
        {level: 72, min: 356400,max: 366460},
        {level: 73, min: 366460,max: 376660},
        {level: 74, min: 376660,max: 387000},
        {level: 75, min: 387000,max: 397480},
        {level: 76, min: 397480,max: 408100},
        {level: 77, min: 408100,max: 418860},
        {level: 78, min: 418860,max: 429760},
        {level: 79, min: 429760,max: 440800},
        {level: 80, min: 440800,max: 451980},
        {level: 81, min: 451980,max: 463300},
        {level: 82, min: 463300,max: 474760},
        {level: 83, min: 474760,max: 486360},
        {level: 84, min: 486360,max: 498100},
        {level: 85, min: 498100,max: 509980},
        {level: 86, min: 509980,max: 522000},
        {level: 87, min: 522000,max: 534160},
        {level: 88, min: 534160,max: 546460},
        {level: 89, min: 546460,max: 558900},
        {level: 90, min: 558900,max: 571480},
        {level: 91, min: 571480,max: 584200},
        {level: 92, min: 584200,max: 591060},
        {level: 93, min: 591060,max: 610060},
        {level: 94, min: 610060,max: 623200},
        {level: 95, min: 623200,max: 636480},
        {level: 96, min: 636480,max: 649900},
        {level: 97, min: 649900,max: 663460},
        {level: 98, min: 663460,max: 677160},
        {level: 99, min: 677160,max: 691000},
        {level: 100, min: 691000,max: 704980},
        {level: 101, min: 704980,max: 719100},
        {level: 102, min: 719100,max: 733360},
        {level: 103, min: 733360,max: 747760},
        {level: 104, min: 747760,max: 762300},
        {level: 105, min: 762300,max: 776980},
        {level: 106, min: 776980,max: 791800},
        {level: 107, min: 791800,max: 806760},
        {level: 108, min: 806760,max: 821860},
        {level: 109, min: 821860,max: 837100},
        {level: 110, min: 837100,max: 852480},
        {level: 111, min: 852480,max: 868000},
        {level: 112, min: 868000,max: 883660},
        {level: 113, min: 883660,max: 899460},
        {level: 114, min: 899460,max: 915400},
        {level: 115, min: 915400,max: 931480},
        {level: 116, min: 931480,max: 947700},
        {level: 117, min: 947700,max: 964060},
        {level: 118, min: 964060,max: 980560},
        {level: 119, min: 980560,max: 997200},
        {level: 120, min: 997200,max: 1013980},
        {level: 121, min: 1013980,max: 1030900},
        {level: 122, min: 1030900,max: 1047960},
        {level: 123, min: 1047960,max: 1065160},
        {level: 124, min: 1065160,max: 1082500},
        {level: 125, min: 1082500,max: 1099980},
        {level: 126, min: 1099980,max: 1117600},
        {level: 127, min: 1117600,max: 1135360},
        {level: 128, min: 1135360,max: 1153260},
        {level: 129, min: 1153260,max: 1171300},
        {level: 130, min: 1171300,max: 1189480},
        {level: 131, min: 1189480,max: 1207800},
        {level: 132, min: 1207800,max: 1226260},
        {level: 133, min: 1226260,max: 1244860},
        {level: 134, min: 1244860,max: 1263600},
        {level: 135, min: 1263600,max: 1282480},
        {level: 136, min: 1282480,max: 1301500},
        {level: 137, min: 1301500,max: 1320660},
        {level: 138, min: 1320660,max: 1339960},
        {level: 139, min: 1339960,max: 1359400},
        {level: 140, min: 1359400,max: 1378980},
        {level: 141, min: 1378980,max: 1398700},
        {level: 142, min: 1398700,max: 1418560},
        {level: 143, min: 1418560,max: 1438560},
        {level: 144, min: 1438560,max: 1458700},
        {level: 145, min: 1458700,max: 1478980},
        {level: 146, min: 1478980,max: 1499400},
        {level: 147, min: 1499400,max: 1519960},
        {level: 148, min: 1519960,max: 1540660},
        {level: 149, min: 1540660,max: 1561500},
    ]
    let levelMin = levelArray[level - 1].min
    let levelMax = levelArray[level - 1].max

    let levelPercentExact = ((experience - levelMin) / (levelMax - levelMin) * 100).toFixed(2)
    let levelPercent = Math.floor((experience - levelMin) / (levelMax - levelMin) * 100)
    let pixelCount = levelPercent * 3

    let msg = await message.channel.send(`${bot.set.typing}`)
   
    const canvas = Canvas.createCanvas(1280, 720)
    const ctx = canvas.getContext('2d')
    
    const background = await Canvas.loadImage('https://i.ibb.co/f40689Y/Profile-Wallpaper-1.jpg')
    const template = await Canvas.loadImage('https://i.ibb.co/527t41n/Profile-Template-3.png')
    const experienceBar = await Canvas.loadImage('https://i.ibb.co/yfgvMvW/Experience-Bar.jpg')
    const blackSquare = await Canvas.loadImage('https://i.ibb.co/dtJ1Xph/Black-Square.png')
    const avatar = await Canvas.loadImage(member.user.avatarURL({format: 'jpg'}))

    if (weapon == 'None'){
        number = shop.weapon.findIndex(item => item.name === weapon)
        itemPower = 0
        weaponImage = await Canvas.loadImage('https://i.ibb.co/dtJ1Xph/Black-Square.png')
    }
    else{
        number = shop.weapon.findIndex(item => item.name === weapon)
        itemPower = shop.weapon[number].power
        itemLink = shop.weapon[number].link
        weaponImage = await Canvas.loadImage(itemLink)
    }

    if (uRoles.has('955850094354255982'))
        symbolImage = await Canvas.loadImage('https://i.ibb.co/TW3nXGv/Symbol-Fire.png')

    else if (uRoles.has('955850097952981022'))
        symbolImage = await Canvas.loadImage('https://i.ibb.co/m4wQpYN/Symbol-Lightning.png')

    else if (uRoles.has('955850101350363136'))
        symbolImage = await Canvas.loadImage('https://i.ibb.co/stbMby6/Symbol-Earth.png')

    else if (uRoles.has('955850104517062686'))
        symbolImage = await Canvas.loadImage('https://i.ibb.co/10HncXP/Symbol-Wind.png')

    else if (uRoles.has('955850111118901308'))
        symbolImage = await Canvas.loadImage('https://i.ibb.co/VC3kfC9/Symbol-Water.png')

    else
        symbolImage = await Canvas.loadImage('https://i.ibb.co/Zmvt41f/Symbol-Blank.png')

    let finalPower = power + itemPower


    ctx.drawImage(background, 0, 0, 1280, 720)
    ctx.drawImage(template, 0, 0, 1280, 720)
    ctx.drawImage(avatar, 33, 33, 285, 285)
    ctx.drawImage(experienceBar, 445, 217, pixelCount, 49)
    ctx.drawImage(blackSquare, 1106, 89, 140, 140)
    ctx.drawImage(weaponImage, 894, 89, 140, 140)
    ctx.drawImage(symbolImage, 70, 410, 200, 200)

    trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)
    let userName = trimString((member.user.username), 13)

    function nameDraw(text, x, y){   
        ctx.font = 'bold 35px Sans-Serif'
        ctx.lineWidth = 5
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
    }
    function drawInfo(text, x, y){   
        ctx.font = 'bold 35px Sans-Serif'
        ctx.lineWidth = 5
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
    }


    function drawMission(text, x, y){   
        ctx.font = 'bold 42px Sans-Serif'
        ctx.lineWidth = 5
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
    }

    function mText(text, x, y){   
        ctx.font = 'bold 32px Sans-Serif'
        ctx.lineWidth = 5
        ctx.fillStyle = 'white'
        ctx.fillText(text, x, y)
    }

    function sText(text, x, y){   
        ctx.font = '25px Sans-Serif'
        ctx.lineWidth = 5
        ctx.fillStyle = 'white'
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
    }

    function drawWeapon(text, x, y){   
        ctx.font = 'bold 37px Sans-Serif'
        ctx.lineWidth = 5
        ctx.fillStyle = 'white'
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
    }

    nameDraw(userName,52, 353)

    drawInfo(`Rank: ${rank}`, 355, 125)
    drawInfo(`Level: ${level}`, 355, 165)
    drawInfo(`EXP: ${experience.toLocaleString()}/${levelArray[level - 1].max.toLocaleString()}`, 355, 205)
    drawInfo(`${levelPercentExact}%`, 515, 255)

    drawInfo(`Health: ${health.toLocaleString()}`, 410, 435)
    drawInfo(`Power: ${finalPower.toLocaleString()}`, 410, 500)
    drawInfo(`Critical: ${critical}%`, 410, 565)

    drawMission(`Missions`, 955, 360)

    mText(`Training: ${train.toLocaleString()}`, 930, 415)
    mText(`D Rank: ${drank}`, 930, 455)
    mText(`C Rank: ${crank}`, 930, 494)
    mText(`B Rank: ${brank}`, 930, 533)
    mText(`A Rank: ${arank}`, 930, 572)
    mText(`S Rank: ${srank}`, 930, 611)
    mText(`SS Rank: ${ssrank}`, 930, 650)

    
    drawWeapon(`Weapon`, 890, 65)
    drawWeapon(`Armor`, 1100, 65)
    drawWeapon(`TBA`, 1138, 177)

    sText(titleCase(weapon), 890, 265)
    

    


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "profile.png")
    const embed = new Discord.MessageEmbed()
        .setColor('00e3ff')
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .attachFiles(attachment)
        .setImage('attachment://profile.png')

    msg.delete()
    message.channel.send(embed)
    
}

module.exports.config = 
{
    desc: "Displays the shinobi's profile.",
    usage: "<@user>",
    command: "profile",
    aliases: ["prof"],
    category: "shinobi",
}