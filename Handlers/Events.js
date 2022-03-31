const fs = require('fs'); 

module.exports = bot => {
    let events = fs.readdirSync('Events');
    let customEvents = fs.readdirSync('Events/customEvents');

    events = events.filter(file => file.endsWith('.js'));
    console.log(`${events.length} events found`);
    customEvents = customEvents.filter(file => file.endsWith('.js'));
    console.log(`${customEvents.length} custom events found`);

    events.forEach(file => {
        let space = "";
        for(let i = 0; i < 32 - file.length; i++)
            space += " ";

        console.log(`Event ${file} ${space}`);
        let eventModule = require(`../Events/${file}`);
        let eventName = file.split('.')[0];
        bot.on(eventName, eventModule.bind(null, bot));
    })

    customEvents.forEach(file => {
        let space = "";
        for(let i = 0; i < 25 - file.length; i++)
            space += " ";

        console.log(`Custom event ${file} ${space}`);
        let eventModule = require(`../Events/customEvents/${file}`);
        let eventName = file.split('.')[0];
        bot.eventEmiter.on(eventName, eventModule.bind(null, bot));
    })
}