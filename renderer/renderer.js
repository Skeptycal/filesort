const jetpack = require('fs-jetpack');
const parseTorrentFile = require('parse-torrent-file');
const fs = require('fs');
const includes = require('lodash.includes');

//file extensions
const bookExt = ["*.epub", "*.mobi"];
const docExt = ["*.pdf", "*.txt", "*.doc", "*.docx", "*.dotx","*.ppt", "*.pptx", "*.md", "*.json", "*.ods", "*.log", "*.xls", "*.xlsx"];
const imageExt = ["*.png", "*.jpg", "*.jpeg", "*.gif", "*.xcf", "*.stl", "*.blend"];
const musicExt = ["*.mp3", "*.wav", "*.flac", "*.m4a", "*.ogg", "*.mid", "*.asd", "*.m3u", "*.pls", "*.alp", "*.asx", "*.bfxrsound"];
const programExt = ["*.dmg", "*.exe", "*.sh", "*.app", "*.pkg", "*.apk", "*.ipa"];
const scriptExt = ["*.py", "*.java", "*.class", "*.sh"];
const torrentExt = ["*.torrent"];
const videoExt = ["*.mkv", "*.mp4", "*.mov", "*.mpeg"];
const webExt = ["*.html", "*.css", "*.js", "*.htm"];
const zippedExt = ["*.zip", "*.rar", "*.7z", "*.tar.gz", "*.tar", "*.gz", "*.unitypackage"];

//files and extensions to ignore
const ignoreList = [".DS_Store"]

/**
 * Sorts and classifies files starting at the given root directory
 * @param  {string} path path to the root directory to begin sorting
 */
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

        // _Web
        let webFiles = jetMaster.find('.', {matching: webExt, recursive: false});
        if (webFiles.length > 0){
            moveFiles(webFiles, `_Web`, jetMaster);
        }

        // _Zipped
        let zippedFiles = jetMaster.find('.', {matching: zippedExt, recursive: false});
        if (zippedFiles.length > 0){
            moveFiles(zippedFiles, `_Zipped`, jetMaster);
        }

        //find all remaining directories
        // let folders = jetMaster.find('.', {files: false, directories: true});
        let folders = jetMaster.list();
        moveFolders(folders, jetMaster);
    }

    console.log("sorted!");
}

/**
 * Move files to the correct _TYPE folder
 * @param  {list} files                     list of files you want to move
 * @param  {string} typeFolder              _TYPE folder name
 * @param  {fs-jetpack} jetPath             fs-jetpack object at the current directory
 */
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
                console.log(`Moving torrent data ${jetPath.cwd()}/${parsed.name} to ${jetPath.cwd()}/${typeFolder}/${parsed.name}`);
                jetPath.dir(`${typeFolder}`);
                jetPath.move(`${jetPath.cwd()}/${parsed.name}`, `${jetPath.cwd()}/${typeFolder}/${parsed.name}`);
            } else {
                console.log("WARNING: Torrent files are missing.");
            }
        } else if (typeFolder == `_Web`) {
            // console.log(`Web file found: ${file}`);
             //check for .htm and .html files
            let webFiles = findWebFiles(file);

            if(webFiles != "") {
                if(jetPath.exists(webFiles)!=false) {
                    console.log(`Moving web page data ${jetPath.cwd()}/${webFiles} to ${jetPath.cwd()}/${typeFolder}/${webFiles}`);
                    jetPath.dir(`${typeFolder}`);
                    jetPath.move(`${jetPath.cwd()}/${webFiles}`, `${jetPath.cwd()}/${typeFolder}/${webFiles}`);
                }  else {
                    console.log("WARNING: Web files are missing.");
                }
            }
        }

        console.log(`Moving file ${jetPath.cwd()}/${file} to ${jetPath.cwd()}/${typeFolder}/${file}`);
        jetPath.dir(`${typeFolder}`);
        jetPath.move(`${jetPath.cwd()}/${file}`, `${jetPath.cwd()}/${typeFolder}/${file}`);
    }
}

function moveFolders(folders, jetPath) {
    let typeFolders = ['_Books', "_Documents","_Images", "_Music", "_Programs", "_Scripts", "_Torrents", "_Videos", "_Zipped"];
    // console.log(folders);
    for(var i=0; i<folders.length; i++){
    	if(jetPath.exists(folders[i])=="dir") { //if it is actually a directory
        //if not _TYPE folder and not ignored
            let jetFolder = jetPath.cwd(`${jetPath.cwd()}/${folders[i]}`) //used for finding items in the folder itself
            let maxFiles = 0;
            let folderType = "";
            if(!(includes(typeFolders, folders[i])) && !(includes(ignoreList, folders[i]))) {
                // console.log(`Folder found: ${folders[i]}`);
                let bookCount = jetFolder.find('.', {matching: bookExt, recursive: false}).length;
                let newMax = checkMaxFiles(bookCount, maxFiles);
                if(newMax) {
                    maxFiles = bookCount;
                    folderType = typeFolders[0];
                }
                let docCount = jetFolder.find('.', {matching: docExt, recursive: false}).length;
                newMax = checkMaxFiles(docCount, maxFiles);
                if(newMax) {
                    maxFiles = docCount;
                    folderType = typeFolders[1];
                }
                let imageCount = jetFolder.find('.', {matching: imageExt, recursive: false}).length;
                newMax = checkMaxFiles(imageCount, maxFiles);
                if(newMax) {
                    maxFiles = imageCount;
                    folderType = typeFolders[2];
                }
                let musicCount = jetFolder.find('.', {matching: musicExt, recursive: false}).length;
                newMax = checkMaxFiles(musicCount, maxFiles);
                if(newMax) {
                    maxFiles = musicCount;
                    folderType = typeFolders[3];
                }
                let programCount = jetFolder.find('.', {matching: programExt, recursive: false}).length;
                newMax = checkMaxFiles(programCount, maxFiles);
                if(newMax) {
                    maxFiles = programCount;
                    folderType = typeFolders[4];
                }
                let scriptCount = jetFolder.find('.', {matching: scriptExt, recursive: false}).length;
                newMax = checkMaxFiles(scriptCount, maxFiles);
                if(newMax) {
                    maxFiles = scriptCount;
                    folderType = typeFolders[5];
                }
                let torrentCount = jetFolder.find('.', {matching: torrentExt, recursive: false}).length;
                newMax = checkMaxFiles(torrentCount, maxFiles);
                if(newMax) {
                    maxFiles = torrentCount;
                    folderType = typeFolders[6];
                }
                let videoCount = jetFolder.find('.', {matching: videoExt, recursive: false}).length;
                newMax = checkMaxFiles(videoCount, maxFiles);
                if(newMax) {
                    maxFiles = videoCount;
                    folderType = typeFolders[7];
                }
                let zippedCount = jetFolder.find('.', {matching: zippedExt, recursive: false}).length;
                newMax = checkMaxFiles(zippedCount, maxFiles);
                if(newMax) {
                    maxFiles = zippedCount;
                    folderType = typeFolders[8];
                }
                //check if folder type isn't empty then move directory to _TYPE folder
                if(folderType != "") {
                    console.log(`Moving folder ${jetPath.cwd()}/${folders[i]} to ${jetPath.cwd()}/${folderType}/${folders[i]}`);
                    jetPath.dir(`${folderType}`);
                    jetPath.move(`${jetPath.cwd()}/${folders[i]}`, `${jetPath.cwd()}/${folderType}/${folders[i]}`);
                } else {
                    //bring up dialog to choose where to put the folder
                    console.log(`Cannot classify: ${folders[i]}`);
                }
            }
        }
    }
}

function checkMaxFiles(fileCount, maxFiles) {
    if(fileCount > maxFiles){
        return true;
    } else {
        return false;
    }
}

function findWebFiles(file){
    let output = "";
    let extCheck = includes(file, ".html");
    let extIndex = file.indexOf(".html");
    if(!extCheck){
        extCheck = includes(file, ".htm");
        extIndex = file.indexOf(".htm");
    }

    // console.log(`extCheck: ${extCheck}`);
    // console.log(`extIndex: ${extIndex}`);
    if(extIndex != -1){
        output = `${file.substr(0, extIndex)}_files`;
    }

    return output;
}
