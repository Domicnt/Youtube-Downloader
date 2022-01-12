const fs = require('fs');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
//keep track of how many videos have no valid characters in their name
var defaultNum = 1;

function download (url, title) {
    //check if title is valid and remove invalid characters
    var str = "";
    for (i = 0, len = title.length; i < len; i++) {
        code = title.charCodeAt(i);
        if (!(code == 32 && str.charCodeAt(str.length - 1) == 32) && (code > 31 && code < 123) && (!(code > 32 && code < 48) || code == 39) && !(code > 57 && code < 65) && !(code > 90 && code < 97)) {
            str += String.fromCharCode(code);
        }
    }

    //unique default names for each song
    if (str.length < 2) {
        str = 'default - ' + defaultNum;
        defaultNum++;
    }

    ytdl(url, {filter: 'audioonly'}).pipe(fs.createWriteStream('songs/'+str+'.mp3'));
    console.log(title + " downloading" + (str!=title?(", name changed to "+str):"") + ".");
}

var playlists = [
    'PL1-8jr0CH4XENRRPD1m__bf7pz4AFNvfP',
];

async function downloadAll() {
    for (const ID of playlists) {
        console.log('Playlist ID requested: ' + ID);
        const playlist = await ytpl(ID, {limit: 9999});
        playlist.items.forEach(element => {
            download(element.url, element.title);
        });
    }
}

downloadAll();