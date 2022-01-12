const fs = require('fs');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

function download (url, title) {
    ytdl(url, {
        format: 'mp3'
    }).pipe(fs.createWriteStream('songs/'+title+'.mp3'));
    console.log(title + " downloaded");
}

var playlists = [
    'PL1-8jr0CH4XENRRPD1m__bf7pz4AFNvfP'
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