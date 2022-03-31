const fs = require('fs'); 

function getFilesRecursive(path, ignoreDir){
    let files = [];
    let dir = fs.readdirSync(path, {withFileTypes: true});
    dir.forEach(file => {
        if(file.isDirectory()){
            if(ignoreDir && ignoreDir.includes(file.name))
                return;
            files = files.concat(getFilesRecursive(`${path}/${file.name}`));    
            return;
        }
        files.push(`${path}/${file.name}`);
    });
    return files;
}

function saveSettings(bot){
    fs.writeFileSync('./Storage/settings.json', JSON.stringify(bot.set))
}

function formatToPageList(items, page, emptyMessage, LIST_SIZE, style){
    page = !isNaN(page) && page > 0 ? page : 1;
    
    if(page > Math.ceil((items.length) / LIST_SIZE))
        page = Math.ceil((items.length) / LIST_SIZE)

    let list = "";
    let pages = `Page ${page} of ${Math.ceil(items.length / LIST_SIZE)}`;
	let i = page * LIST_SIZE - LIST_SIZE;
    if(!items.length){
        list = emptyMessage;
        pages = "Page 1 of 1";
    } else {
        while(i < page * LIST_SIZE && i < items.length){
            if(style == 'code'){
                list += `\`${items[i]}\`\n`;
                i++;
            } else if(style == 'bold') {
                list += `**${items[i]}**\n`;
                i++;
            } else {
                list += `${items[i]}\n`;
                i++;
            }
        }
    }
    return {list: list, pages: pages}
}

function titleCase(str) {
    let splitStr = str.toLowerCase().split(/ +/);
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

function generateCode(length, containUppercase) {
    let result = '';
    let characters = containUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for(let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateCharacter(settings){
    let data = settings.game.data;
    return data[Math.floor(Math.random() * data.length)];
    
}

function convertMiliseconds(miliseconds, format) {
    let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
  
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);
    
    switch(format) {
      case 's':
          return total_seconds;
      case 'm':
          return total_minutes;
      case 'h':
          return total_hours;
      case 'd':
          return days;
      default:
          return { d: days, h:  hours, m: minutes, s: seconds };
    }
}

function formatTime(ms){
    let {d, h, m, s} = convertMiliseconds(ms);
    let timeStr = '';

    if(d){
        timeStr += `${d} days `;
        if(h)
            timeStr += `${h}:`;
        if(m){
            m = m.toString().length == 1 ? `0${m}` : m;
            timeStr += `${m}:`;
        }
        if(s){
            s = s.toString().length == 1 ? `0${s}` : s;
            timeStr += `${s}`
        }
    }else{
        if(h)
            if(m || s)
                timeStr += `${h}:`;
            else
                timeStr += `${h}hours`;

        m = m.toString().length == 1 ? `0${m}` : m;
        s = s.toString().length == 1 ? `0${s}` : s;

        if(m || s)
            timeStr += `${m}:${s}`;
    }
    return timeStr;
}




module.exports = {
    getFilesRecursive,
    saveSettings,
    formatToPageList,
    generateCode,
    generateCharacter,
    convertMiliseconds,
    formatTime,
    titleCase,
}