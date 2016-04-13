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
    mainWindow.setClosable(true);
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setSkipTaskbar(true);
    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setAutoHideMenuBar(true);
  },

  renderMain() {
    mainWindow.setBounds({width: 300,
                          height: 400,
                          frame: false,
                          x: 1000,
                          y: 0
                          });
    mainWindow.setResizable(true);
    mainWindow.setMovable(true);
    mainWindow.setClosable(true);
    mainWindow.setAlwaysOnTop(false);
    mainWindow.setSkipTaskbar(false);
    mainWindow.setClosable(false);
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.setVisibleOnAllWorkspaces(false);
    mainWindow.setAutoHideMenuBar(false);
  }
};


exports.windowEvents = windowEvents;
