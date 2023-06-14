const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

//keep track of how many videos have no valid characters in their name
var defaultNum = 1;

async function download (url, title) {
    //check if title is valid and remove invalid characters
    var str = "";
    for (i = 0, len = title.length; i < len; i++) {
        code = title.charCodeAt(i);
        if (!(code == 32 && str.charCodeAt(str.length - 1) == 32) && //avoid 2 subsequent spaces
        (code > 31 && code < 127) && //avoid non-printing characters
        !([60, 62, 58, 34, 47, 124, 92, 63, 42].includes(code))) { //avoid illegal characters for windows filenames
            str += String.fromCharCode(code);
        }
    }

    //unique default names for each song
    if (str.length < 2) {
        str = 'default - ' + defaultNum;
        defaultNum++;
    }

    let info = await ytdl.getInfo(url);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    let audioFormat = ytdl.chooseFormat(audioFormats, {quality: 'highestaudio'});

    let name = str+'.'+audioFormat.audioCodec;
    let path = 'downloads/'+name;
    if (!fs.existsSync(path)) {
        let stream = ytdl(url, {format: audioFormat});
        stream.pipe(fs.createWriteStream(path));
        console.log(name + " downloading.");
    }
}

var playlists = config.playlists;

async function downloadAll() {
    for (const ID of playlists) {
        console.log('Playlist ID requested: ' + ID);
        const playlist = await ytpl(ID, {limit: Infinity});
        playlist.items.forEach(element => {
            download(element.url, element.title);
        });
    }
}

downloadAll();