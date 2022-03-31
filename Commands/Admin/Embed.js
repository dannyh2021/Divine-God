const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    if (args[0] == 'rules'){
    message.delete()
    await bot.sleep(2000)

    const embed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setImage('https://i.ibb.co/KhC2rHZ/Banner-Server-Rules.gif')

    message.channel.send(embed)

    embed.setImage('https://i.ibb.co/jTMr9QW/GIF-Orange.gif')
    embed.setDescription(`
You must follow all **[Discord TOS](https://discord.com/terms)** and **[Discord Guidelines](https://discord.com/guidelines)**
    
**1 - NO Disturbing Content**
Do not post or talk about NSFW, violence, etc.
    
**2-NO Fighting**
Do not insult or harass anyone in any way. Joking around will be fine as long as the other user is fine with it. Any personal arguments must be taken to DM to be resolved personally.
    
**3-NO Spamming**
Do not spam in general channels.
    
**4-NO Raiding**
Anyone who raids will result in a permanent ban, no exception.
    
**5-NO Advertising**
Do not try to self promote yourself or anyone else through the server. If you are a regularly active member in the server, you will be allowed to request advertisements.
    
**6-NO Spam Pings**
Do not ping members or roles without a reason. This will be considered as spam.
    
**7-NO Racism**
You may talk and reveal your age/race. However, do not show any sort of racism to anyone and do not insult orjudge anyone due to their age.
    
**8-NO Begging**
Do not ask anyone to give out stuff including XP, Money, Nitro, etc.
    `)

    message.channel.send(embed)
    }

    if (args[0] == 'roles'){
        message.delete()
        await bot.sleep(2000)
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setImage('https://i.ibb.co/R6bLpHc/Banner-Roles.gif')

        message.channel.send(embed)

        embed.setImage('https://i.ibb.co/gm7XVD3/GIF-Purple.gif')
        embed.setTitle('Leveled Roles')
        embed.setDescription(`
You gain **10-15** XP every time you send a message within a **2-minute** interval. To check your XP level, go to <#815381537293860904> and type \`t!rank\`. Below are the various roles you can obtain with XP:

1. <@&954186844336189470> - 1,000 XP
2. <@&954186847402221568> - 2,500 XP
3. <@&954186870592516146> - 5,000 XP
4. <@&954186850380169286> - 10,000 XP
5. <@&954186853026779189> - 25,000 XP
6. <@&954186856097001472> - 50,000 XP
7. <@&954186859003666473> - 100,000 XP
8. <@&954186862002577438> - 250,000 XP
9. <@&954186864749858826> - 500,000 XP
10. <@&954186867648122890> - 1,000,000 XP
        `)
        message.channel.send(embed)

        embed.setTitle('Gaming Roles')
        embed.setDescription(`
<@&956194655115026472> - Must be world level 8 in Genshin Impact
<@&956194657820356619> - Must get 10 kills in a BR game or must get 2k damage in a game
<@&956194660802527242> - Must get 100wpm+ in 30 seconds
<@&956194663382024192> - Must reach Platinum in Valorant

Message <@575252669443211264> with proof to obtain these roles!
        `)

        message.channel.send(embed)

        embed.setTitle('Special Roles')
        embed.setDescription(`
<@&819661112625725521> - Server boosters
<@&954235393136533536> - User with most ryo
<@&956194666280288286> - Must win 1st place in an art tournament

You can request a custom role after reaching <@&954186859003666473>! DM <@575252669443211264>
        `)

        message.channel.send(embed)

        embed.setTitle('Server Staff Roles')
        embed.setDescription(`
<@&927931404153651200> - Server Owners
<@&954188634226032692> - Server Administrators
<@&886028800830369873> - Server Moderators
        `)
        message.channel.send(embed)
    }

    if (args[0] == 'missions'){
        message.delete()
        await bot.sleep(2000)
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setImage('https://i.ibb.co/DMnW67B/Banner-Missions.png')

        message.channel.send(embed)

        embed.setImage('https://i.ibb.co/5s7VR6P/GIF-Green.gif')
        embed.setDescription(`
        Manual missions are a form of missions to earn ryo and experience not through the bot itself, but through an activity given by a moderator. 
        Example:
        
**__Topic Creating__**
**Description:** Create 10 topics to be used with a $topic command.
**Reward:** 1,000 ryo | 250 experience

To take on one of these missions, react to the shuriken symbol underneath the mission and DM <@575252669443211264> to receive further instructions!
        `)
        message.channel.send(embed)
    }

    if (args[0] == 'divine'){
        message.delete()
        await bot.sleep(1000)
        const embed = new Discord.MessageEmbed()    
            .setColor('BLUE')
            .setImage('https://i.ibb.co/Mk8L75G/Banner-Divine-God.png')

        message.channel.send(embed)
        embed.setImage('https://i.ibb.co/jHBKBMQ/GIF-Blue.gif')


        embed.setTitle('Divine God')
        embed.setDescription(`
Welcome to Divine God!
Divine God is a custom Naruto Bot made for this server.
It has many features including message counter, economy system, custom games, Naruto RPG system, and much more!
Majority of these commands and games are to be used in <#954358378707156993> and <#955684987502465044>
        `)
        message.channel.send(embed)

        embed.setTitle('Basic Commands')
        embed.setDescription(`
**$help:** pull a help menu and get detailed help on commands
**$balance:** check yours or another user's balance
**$leaderboard:** displays a leaderboard of the top 10 members with the most ryo in their bank
**$deposit:** deposits ryo from your cash to your bank
**$withdraw:** withdraws ryo from your cash to your bank
**$shop:** opens the server shop
**$buy:** purchase an item from the server shop
**$inventory:** opens your inventory
**$equip:** equip an item from your inventory
**$message:** check an approximate count of your messages in the server
        `)
        message.channel.send(embed)

        embed.setTitle(`Ryo Commands`)
        embed.setDescription(`
**__Starter Commands__**
**$daily:** claim **150-300** ryo every **24h**
**$meditate:** claim **200-250** ryo every **24h**
**$defend:** claim **150-200** ryo every **24h**
**$eat:** claim **75-100** ryo every **4h**
**$report:** claim **100-200** ryo every **4h**
**$search:** claim **50-100** ryo every **2h**

**__Role Purchased Commands__**
**$byakugan:** claim **30-50** ryo every **2h** <@&957280338122518578>
**$sharingan:** claim **50-75** ryo every **2.5h** <@&957280324746883083>
**$ms:** claim **100-150** ryo every **6h** <@&957280328223977532>
**$ems:** claim **150-250** ryo every **12h** <@&957280341574430750>
**$jogan:** claim **250-300** ryo every **15h** <@&957280344313311323>
**$rinnegan:** claim **350-500** ryo every **18h** <@&957280331470372935>
**$yin:** claim **500-750** ryo every **22h** <@&957280335069061130>
**$yang:** claim **500-750** ryo every **22h** <@&957280348411166720>
**$tenseigan:** claim **750-1,000** ryo every **24h** <@&957280351917600818>
**$rs:** claim **1,000-1,500** ryo every **24h** <@&957280403322978304>
        `)
        message.channel.send(embed)

        embed.setTitle('Games')
        embed.setDescription(`
**__Character Game__**
Guess characters from Naruto to earn ryo!
🡆 You get **3** tries to guess each character.
🡆 You earn **15-30** ryo for every correct guess.
🡆 You can play a total of **50** games every **12h**
🡆 **$game:** start a game
🡆 **$game wins:** check how many game wins you have
🡆 **$game lb:** check the game leaderboard on wins

**__Coin Flip Gamble__**
Gamble your ryo on a coin flip!
🡆 You can gamble between **100-1,000** ryo at once.
🡆 You can gamble once every minute.
🡆 **$coin [heads | tails] [amount]:** do the coin flip

**__Slots Gamble__**
Gamble your ryo on a slots game!
🡆 You can gamble between **100-2,000** ryo at once.
🡆 You can gamble once every minute.
🡆 **$gamble [amount]:** play the slot game
`)
        message.channel.send(embed)

        embed.setTitle('Shinobi RPG')
        embed.setDescription(`
Shinobi RPG is an exciting feature where you role play as your own Ninja and earn experience to level/rank up while earning rewards and such.
Use **$start** to get started as a shinobi!

**__Command List__**
**$profile:** view your shinobi profile
**$shinobileaderboard:** view the shinobi leaderboard on level or experience
**$shinobidaily:** claim your daily shinobi rewards
**$train:** train yourself to earn experience
**$arank:** go on an A Rank mission for experience and ryo
**$brank:** go on a B Rank mission for experience and ryo
**$crank:** go on a C Rank mission for experience and ryo
**$drank:** go on a D Rank mission for experience and ryo
**$weekly:** check your weekly mission status
**$table:** displays a table of the ranks and levels
**$enemy:** displays information about the enemies encountered in missions
**$mystery:** open a mystery box 
        `)
        message.channel.send(embed)
    }
}

module.exports.config = 
{
    roles: ["954181231476609074", "927931404153651200", "954199958620352542"],
    command: "embed",
    category: "admin",
}