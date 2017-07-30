const electron = require('electron')

const BrowserWindow = electron.BrowserWindow
const app = electron.app

app.on('ready', event=>{
    'use strict';
    const win = new BrowserWindow({width:600, height:200});
    win.loadURL(`file://${__dirname}/html/index.html`);
});
