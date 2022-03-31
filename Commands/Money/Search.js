const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => 
{
    let amount = Math.floor(Math.random() * 51 + 50)
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {

            var j = Math.floor(Math.random() * (i + 1));

            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }


    async function show() {
        var arr = 
            [
                "Ichiraku Ramen Shop",
                "Great Naruto Bridge",
                "Akatsuki Hideout",
                "Kara Hideout",
                "Academy",
                "Dango Shop", 
                "Hokage Office", 
                "Hozuki Castle", 
                "Thunder Burger Restaurant",
                "Forest of Death",
                "Village Front Gates",
                "Hokage Mountain",
                "Final Valley"
            ]
        var arr1 = shuffleArray(arr)

        text = `1. ${arr1[0]}\n\u20012. ${arr1[1]}\n\u20013. ${arr1[2]}`     

        let msg = await message.channel.send(bot.embed(`Where do you wanna search? Please type the number of the corresponding location.\n\u2001${text}`, message.author))

        let input = await message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 60000, max: 1})

        if(!input.first()){
            return msg.edit(bot.failEmbed(`You have failed your search because you did not provide a number!`, message.author))
        }
        let inputValue = parseFloat(input.first().content)

        if (isNaN(inputValue) || inputValue != 1 && inputValue != 2 && inputValue != 3)
            return msg.edit(bot.failEmbed(`You have failed your search because you did not provide a valid number!`, message.author))

        msg.edit(bot.embed(`Searching **${arr1[inputValue - 1]}**...`, message.author))
        await bot.sleep(3000)
        msg.edit(bot.embed(`🔍 You have searched **The ${arr1[inputValue - 1]}** and earned **${amount}** ryo!`, message.author))
        bot.eco.add(`${message.author.id}.balance`, amount)
    }
    show()

    

}

module.exports.config = 
{
    desc: "Search an area for **50-100** ryo.",
    command: "search",
    category: "money",
    cooldown: 2 * 3600
}