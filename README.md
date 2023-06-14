**Youtube Downloader**
===
---
A simple node.js app to download songs from youtube playlists locally.

Usage
---
Add the URL of the playlist(s) you want to download to the 
config JSON file. The config file should look like this:

    {
        "playlists": [
            ""
        ]
    }
    
After adding multiple playlists, the config file should look
something like this:

    {
        "playlists": [
            "https://www.youtube.com/playlist?list=PL1-8jr0CH4XH4hkjusadnnYusdiWiisda",
            "https://www.youtube.com/playlist?list=PL1-8jr0CH4XH4hkjusadnnYusdiWiisda",
            "https://www.youtube.com/playlist?list=PL1-8jr0CH4XH4hkjusadnnYusdiWiisda"
        ]
    }
    
Note that playlists must be separated by commas, but there is no trailing comma.

Once the config file is set up, save and close it, then run the Downloader.exe 
executable file, and all songs will be put in the /downloads folder.
