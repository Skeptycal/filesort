const jetpack = require('fs-jetpack');
const parseTorrentFile = require('parse-torrent-file');

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
        moveFiles(bookFiles, `_Books`, jetMaster);

        // _Documents
        let docFiles = jetMaster.find('.', {matching: docExt, recursive: false});
        moveFiles(docFiles, `_Documents`, jetMaster);

        // _Images
        let imageFiles = jetMaster.find('.', {matching: imageExt, recursive: false});
        moveFiles(imageFiles, `_Images`, jetMaster);

        // _Music
        let musicFiles = jetMaster.find('.', {matching: musicExt, recursive: false});
        moveFiles(musicFiles, `_Music`, jetMaster);

        // _Programs
        let programFiles = jetMaster.find('.', {matching: programExt, recursive: false});
        moveFiles(programFiles, `_Programs`, jetMaster);

        // _Scripts
        let scriptFiles = jetMaster.find('.', {matching: scriptExt, recursive: false});
        moveFiles(scriptFiles, `_Scripts`, jetMaster);

        // _Torrents
        let torrentFiles = jetMaster.find('.', {matching: torrentExt, recursive: false});
        moveFiles(torrentFiles, `_Torrents`, jetMaster);

        // _Videos
        let videoFiles = jetMaster.find('.', {matching: videoExt, recursive: false});
        moveFiles(videoFiles, `_Videos`, jetMaster);

        // _Zipped
        let zippedFiles = jetMaster.find('.', {matching: zippedExt, recursive: false});
        moveFiles(zippedFiles, `_Zipped`, jetMaster);

        //find all remaining directories

    }

    console.log("sorted");
}

function moveFiles(files, typeFolder, jetPath) {
    console.log(files);
    for(let file of files) {
        console.log(`Moving from ${jetPath.cwd()}/${file} to ${jetPath.cwd()}/${typeFolder}/${file}`)
        jetPath.dir(`${typeFolder}`);
        jetPath.move(`${jetPath.cwd()}/${file}`, `${jetPath.cwd()}/${typeFolder}/${file}`);
    }
    // console.log(`Moved files to ${typeFolder}.`)
}