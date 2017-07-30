const jetpack = require('fs-jetpack');

function sortFiles(path) {
    console.log("sortFiles - start");
    let files = jetpack.list(path);
    if (files === undefined){
        console.log("Read error");
    } else{
        for(let file of files) {
            console.log(file);
        }
    }

    console.log("sortFiles - end");
}