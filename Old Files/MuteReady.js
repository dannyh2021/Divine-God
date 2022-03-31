setInterval(async () => 
{
    let oneUser = bot.guilds.cache.get("815372530663292948").members.cache.array().filter(m => m.roles.cache.has("815393927913799701"))

for(let user of oneUser){
    let mutetime = bot.eco.get(user.id).mutetime
    let now = Date.now()
    if (now > mutetime)
        user.roles.remove('815393927913799701')
}
}, 5 * second)