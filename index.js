const fs = require('fs');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

function download (url, title) {
    //check if title is valid and remove invalid characters
    var str = "";
    var lastCode = 0;
    for (i = 0, len = title.length; i < len; i++) {
        code = title.charCodeAt(i);
        if (!(code == 32 && str.charCodeAt(str.length - 1) == 32) && (code > 31 && code < 128) && (code != 47 && code != 92)) {
            str += String.fromCharCode(code);
        }
        lastCode = code;
    }
    
    ytdl(url, {format: 'mp3'}).pipe(fs.createWriteStream('songs/'+str+'.mp3'));
    console.log(title + " downloaded" + (str!=title?(", name changed to "+str):"") + ".");
}

var playlists = [
    'PL1-8jr0CH4XENRRPD1m__bf7pz4AFNvfP',
];

async function downloadAll() {
    for (const ID of playlists) {
        console.log('Playlist ID requested: ' + ID);
        const playlist = await ytpl(ID);
        playlist.items.forEach(element => {
            download(element.url, element.title);
        });
    }
    console.log('All songs downloaded.');
}

downloadAll();