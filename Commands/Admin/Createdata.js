const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let oneUser = message.guild.members.cache.array().filter(m => m.roles.cache.has("815389418051207178"))
  
    for(let user of oneUser){
        if (!bot.eco.has(user.id)){
            bot.eco.set(`${user.id}.balance`, 0)
            bot.eco.set(`${user.id}.bank`, 0)
            bot.eco.set(`${user.id}.game`, 0)
            bot.eco.set(`${user.id}.gamecount`, 0)
            bot.eco.set(`${user.id}.drop`, 0)
            bot.eco.set(`${user.id}.messages`, 0)
            bot.eco.set(`${user.id}.points`, 0)
    
            bot.eco.set(`${user.id}.warn`, 0)
            bot.eco.set(`${user.id}.mutetime`, 0)
    
            bot.eco.set(`${user.id}.start`, 0)
    
            bot.eco.set(`${user.id}.balancebackground`, "None")
            bot.eco.set(`${user.id}.balanceinventory`, [])
        }   
    }
        
}

module.exports.config = 
{
    roles: ["954181231476609074"],
    desc: "Create a database.",
    command: "createdata",
    category: "admin",
}