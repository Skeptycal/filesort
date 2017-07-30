const jetpack = require('fs-jetpack');

//file extensions
const bookExt = ["*.epub", "*.mobi"];
const docExt = ["*.pdf", "*.txt", "*.doc", "*.docx", "*.dotx","*.ppt", "*.pptx", "*.md", "*.json", "*.ods", "*.log", "*.xls", "*.xlsx"];
const imageExt = ["*.png", "*.jpg", "*.jpeg", "*.gif", "*.xcf", "*.stl", "*.blend"];
const musicExt = ["*.mp3", "*.wav", "*.flac", "*.m4a", "*.ogg", "*.mid", "*.asd", "*.m3u", "*.pls", "*.alp", "*.asx", "*.bfxrsound"];
const programsExt = ["*.dmg", "*.exe", "*.sh", "*.app", "*.pkg", "*.apk", "*.ipa"];
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
        let musicFiles = jetMaster.find('.', {matching: musicExt, recursive: false});
        for(let file of musicFiles) {
            console.log(`_Music: ${file}`);
        }
        //find all remaining directories

    }

    console.log("sorted");
}