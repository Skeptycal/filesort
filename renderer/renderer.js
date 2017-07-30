const jetpack = require('fs-jetpack');
const parseTorrentFile = require('parse-torrent-file');
const fs = require('fs');

//file extensions
const bookExt = ["*.epub", "*.mobi"];
const docExt = ["*.pdf", "*.txt", "*.doc", "*.docx", "*.dotx","*.ppt", "*.pptx", "*.md", "*.json", "*.ods", "*.log", "*.xls", "*.xlsx"];
const imageExt = ["*.png", "*.jpg", "*.jpeg", "*.gif", "*.xcf", "*.stl", "*.blend"];
const musicExt = ["*.mp3", "*.wav", "*.flac", "*.m4a", "*.ogg", "*.mid", "*.asd", "*.m3u", "*.pls", "*.alp", "*.asx", "*.bfxrsound"];
const programExt = ["*.dmg", "*.exe", "*.sh", "*.app", "*.pkg", "*.apk", "*.ipa"];
const scriptExt = ["*.py", "*.java", "*.class", "*.sh"];
const torrentExt = ["*.torrent"];
const videoExt = ["*.mkv", "*.mp4", "*.mov", "*.mpeg"];
const zippedExt = ["*.zip", "*.rar", "*.7z", "*.tar.gz", "*.tar", "*.gz", "*.unitypackage"];

function sortFiles(path) {
    const jetMaster = jetpack.cwd(path);
    console.log(`Master folder: ${jetMaster.cwd()}`);

    let files = jetMaster.list(path);
    if (files === undefined){
        console.log("Read error");
    } else{
        // for(let file of files) {
        //     console.log(file);
        // }

        // run through each type of file

        // _Books
        let bookFiles = jetMaster.find('.', {matching: bookExt, recursive: false});
        if (bookFiles.length > 0){
            moveFiles(bookFiles, `_Books`, jetMaster);
        }

        // _Documents
        let docFiles = jetMaster.find('.', {matching: docExt, recursive: false});
        if (docFiles.length > 0){
            moveFiles(docFiles, `_Documents`, jetMaster);
        }
        // _Images
        let imageFiles = jetMaster.find('.', {matching: imageExt, recursive: false});
        if (imageFiles.length > 0){
            moveFiles(imageFiles, `_Images`, jetMaster);
        }
        // _Music
        let musicFiles = jetMaster.find('.', {matching: musicExt, recursive: false});
        if (musicFiles.length > 0){
            moveFiles(musicFiles, `_Music`, jetMaster);
        }

        // _Programs
        let programFiles = jetMaster.find('.', {matching: programExt, recursive: false});
        if (programFiles.length > 0){
            moveFiles(programFiles, `_Programs`, jetMaster);
        }

        // _Scripts
        let scriptFiles = jetMaster.find('.', {matching: scriptExt, recursive: false});
        if (scriptFiles.length > 0){
            moveFiles(scriptFiles, `_Scripts`, jetMaster);
        }

        // _Torrents
        let torrentFiles = jetMaster.find('.', {matching: torrentExt, recursive: false});
        if (torrentFiles.length > 0){
            moveFiles(torrentFiles, `_Torrents`, jetMaster);
        }

        // _Videos
        let videoFiles = jetMaster.find('.', {matching: videoExt, recursive: false});
        if (videoFiles.length > 0){
            moveFiles(videoFiles, `_Videos`, jetMaster);
        }

        // _Zipped
        let zippedFiles = jetMaster.find('.', {matching: zippedExt, recursive: false});
        if (zippedFiles.length > 0){
            moveFiles(zippedFiles, `_Zipped`, jetMaster);
        }

        //find all remaining directories

    }

    console.log("sorted");
}

function moveFiles(files, typeFolder, jetPath) {
    // console.log(files);
    for(let file of files) {
        if(typeFolder === `_Torrents`) {
            var torrent = fs.readFileSync(jetPath.cwd()+'/'+file);
            var parsed;
            try {
              parsed = parseTorrentFile(torrent);
            } catch (e) {
              // the torrent file was corrupt
              console.error(e);
            }
            //check existence
            if(jetPath.exists(parsed.name)!=false) {
                console.log(`Moving from ${jetPath.cwd()}/${parsed.name} to ${jetPath.cwd()}/${typeFolder}/${parsed.name}`);
                jetPath.dir(`${typeFolder}`);
                jetPath.move(`${jetPath.cwd()}/${parsed.name}`, `${jetPath.cwd()}/${typeFolder}/${parsed.name}`);
            } else {
                console.log("WARNING: Torrent files are missing.");
            }
        }

        console.log(`Moving from ${jetPath.cwd()}/${file} to ${jetPath.cwd()}/${typeFolder}/${file}`);
        jetPath.dir(`${typeFolder}`);
        jetPath.move(`${jetPath.cwd()}/${file}`, `${jetPath.cwd()}/${typeFolder}/${file}`);

    }
    // console.log(`Moved files to ${typeFolder}.`);
}