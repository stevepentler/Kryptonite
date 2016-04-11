'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();
  mainWindow.setResizable(false);
  mainWindow.setMovable(false);
  mainWindow.setMinimizable(false);
  mainWindow.setClosable(false);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.setSkipTaskbar(true);
  // mainWindow.setKiosk(true);
  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
