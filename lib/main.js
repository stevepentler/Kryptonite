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
                                  x: 30,
                                  y: 30
                                  });
  appIcon = new Tray('assets/krypton.jpeg');

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

let renderPomo = function(){
  mainWindow = new BrowserWindow();
    mainWindow.maximize();
    mainWindow.setResizable(false);
    mainWindow.setMovable(false);
    mainWindow.setMinimizable(false);
    mainWindow.setClosable(false);
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setSkipTaskbar(true);
    mainWindow.setKiosk(true);
    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setAutoHideMenuBar(true);
};
