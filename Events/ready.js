const { saveSettings } = require("../Util/utils");
const { formatTime } = require("../Util/utils");

module.exports = async (bot) => 
{
    bot.user.setActivity("$help to get started!",{ type: 'PLAYING'})
    console.log('\nDivine God is online!')

    let second = 1000
    let minute = 60 * second
    let hour = 60 * minute

    setInterval(async () => 
    {
        let memberTotal = bot.guilds.cache.get("815372530663292948").members.cache.filter(member => !member.user.bot).size;
        let botTotal = bot.guilds.cache.get("815372530663292948").members.cache.filter(member => member.user.bot).size;
        let grandTotal = memberTotal + botTotal
    
        let grandChannel = bot.channels.resolve("895473405783080960")
        let memberChannel = bot.channels.resolve("895473409100746793")
        let botChannel = bot.channels.resolve("895473412380704809")

        grandChannel.setName(`📊 Total: ${grandTotal}`)
        memberChannel.setName(`🧑 Members: ${memberTotal}`)
        botChannel.setName(`🤖 Bots: ${botTotal}`)
    }, 10 * minute)

    setInterval(async () => 
    {
        let weekly = bot.set.weekly
        if(weekly.status == 'on'){
            let msg = await bot.channels.resolve("956692064219840612").messages.fetch(weekly.message);
            const embed = msg.embeds[0];

            if(Date.now() > weekly.expiration ){
                weekly.status = 'off'
                weekly.expiration = 0
                weekly.message = "None"
                weekly.description = "None"
                weekly.xpAward = 0
                weekly.ryoAward = 0
                saveSettings(bot)
                embed.setDescription(`${weekly.description}\n\n**Time Remaining:** Finished!`)
                msg.delete()
            }
            else{
                let time = weekly.expiration - Date.now();
                embed.setDescription(`
${weekly.description}

**Rewards:**
\u2001• ${weekly.ryoAward.toLocaleString()} ryo
\u2001• ${weekly.xpAward.toLocaleString()} experience

**Time Remaining:** ${formatTime(time)}`)
                msg.edit(embed)
            }
    
        }
    }, 30 * second)
}

