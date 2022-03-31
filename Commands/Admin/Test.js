const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports.run = async (bot, message, args) => 
{
    let weaponinventory = bot.rpg.get(message.author.id).weaponinventory
    weaponinventory.splice(weaponinventory.indexOf('shuriken'), 1)

    bot.rpg.set(`${message.author.id}.weaponinventory`, weaponinventory)



    return
    t = ['A', 'B', 'C', 'B'];
    t.splice(t.indexOf('B'), 1); // will return ['B'] and t is now equal to ['A', 'C', 'B']
    message.channel.send(t)
}

module.exports.config = 
{
    roles: ["954181231476609074"],
    desc: "A testing command.",
    command: "test",
    category: "admin"
}