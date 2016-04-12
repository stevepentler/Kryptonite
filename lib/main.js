'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;

let mainWindow = null;
let appIcon = null;
app.commandLine.appendSwitch('enable-transparent-visuals');
app.on('ready', () => {
  mainWindow = new BrowserWindow({
                                  width: 300,
                                  height: 400,
                                  frame: false,
                                  x: 1000,
                                  y: 0
                                  });
  appIcon = new Tray('assets/krypton.jpeg');

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

const windowEvents = {
  renderPomo(){
    mainWindow.maximize();
    mainWindow.setResizable(false);
    mainWindow.setMovable(false);
    mainWindow.setMinimizable(false);
    mainWindow.setClosable(false);
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setSkipTaskbar(true);
    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setAutoHideMenuBar(true);
  }
};


exports.windowEvents = windowEvents;
