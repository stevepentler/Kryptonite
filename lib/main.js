'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;

let mainWindow = null;
let appIcon = null;
let active = true;
let pomo = false;

app.commandLine.appendSwitch('enable-transparent-visuals');
app.on('ready', () => {

  appIcon = new Tray('assets/krypton.jpeg');

  mainWindow = new BrowserWindow({
                                  width: 300,
                                  height: 400,
                                  frame: false,
                                  x: 1000,
                                  y: 0
                                  });

  appIcon.on('click', function(event, bounds){
    if (!pomo){
      active = !active;
      active ? windowEvents.renderMain(bounds.x) : windowEvents.hideMain();
    }
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});



const windowEvents = {
  renderPomo(){
    pomo = true;
    mainWindow.show();
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
    mainWindow.setFullScreenable(true);
  },

  renderMain(x) {
    pomo = false;
    mainWindow.setBounds({width: 300,
                          height: 400,
                          frame: false,
                          x: x,
                          y: 0
                          });
    mainWindow.setResizable(true);
    mainWindow.setMovable(true);
    mainWindow.setClosable(true);
    mainWindow.setAlwaysOnTop(false);
    mainWindow.setSkipTaskbar(false);
    mainWindow.setClosable(true);
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.setVisibleOnAllWorkspaces(false);
    mainWindow.setAutoHideMenuBar(false);
    mainWindow.show();
  },

  hideMain() {
    mainWindow.hide();
  }
};


exports.windowEvents = windowEvents;
