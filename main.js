const electron = require('electron')

const BrowserWindow = electron.BrowserWindow
const app = electron.app

const ipc = electron.ipcMain
const dialog = electron.dialog

app.on('ready', event=>{
    'use strict';
    const win = new BrowserWindow({width:600, height:400});
    // const win = new BrowserWindow({width:600, height:400, titleBarStyle: 'hiddenInset'}); //Strictly macOS
    win.loadURL(`file://${__dirname}/html/index.html`);
});

ipc.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, function (files) {
        if (files) event.sender.send('selected-directory', files)
    })
})
