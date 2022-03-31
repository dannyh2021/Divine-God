const { saveSettings } = require('../../Util/utils.js');

module.exports = async(bot, member) => {
    
    if(member && member.user.bot)
        return;
        
    let balances = bot.eco.all().map(db => {
        let data;
        try{
            data = JSON.parse(db.data);
        }catch{
            data = db.data;
        }
        let user = bot.users.resolve(db.ID);
        if(!user)
            return;
            
        return {userID: user.id, bank: data.bank};//facepalm
    }).filter(o => o)
    balances.sort((a, b) => b.bank - a.bank);

    if(balances[0].userID == bot.set.rewards.lbLeader)
        return;

    let lbRole = bot.set.rewards.lbRole;
    if(lbRole == 'none')
        return;

    let newLeader = bot.guilds.resolve(bot.config.guildID).members.resolve(balances[0].userID);
    if(bot.set.rewards.lbLeader == "none"){
        bot.set.rewards.lbLeader = newLeader.id;
        newLeader.roles.add(lbRole);
    }else{
        let prevLeader = bot.guilds.resolve(bot.config.guildID).members.resolve(bot.set.rewards.lbLeader);
        bot.set.rewards.lbLeader = newLeader.id;
        if(prevLeader)
            prevLeader.roles.remove(lbRole)
        newLeader.roles.add(lbRole);
    }
    


    saveSettings(bot)
};