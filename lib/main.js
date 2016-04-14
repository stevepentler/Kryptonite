'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;

let mainWindow = null;
let appIcon = null;
let active = true;
let pomo = false;
let trayX;
let defaultX;

app.commandLine.appendSwitch('enable-transparent-visuals');
app.on('ready', () => {

  appIcon = new Tray('assets/krypton.jpeg');

  const electronScreen = require('screen');
  let defaultScreen = electronScreen.getPrimaryDisplay();
  defaultX = (defaultScreen.bounds.width - 300);

  mainWindow = new BrowserWindow({
                                  width: 300,
                                  height: 400,
                                  frame: false,
                                  x: defaultX,
                                  y: 0
                                  });


  appIcon.on('click', function(event, bounds){
    trayX = bounds.x;
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

  renderMain() {
    pomo = false;
    mainWindow.setResizable(true);
    mainWindow.setFullScreenable(false);
    mainWindow.setMovable(true);
    mainWindow.setClosable(true);
    mainWindow.setAlwaysOnTop(false);
    mainWindow.setSkipTaskbar(false);
    mainWindow.setClosable(true);
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.setVisibleOnAllWorkspaces(false);
    mainWindow.setAutoHideMenuBar(false);
    mainWindow.setBounds({width: 300,
                          height: 400,
                          frame: false,
                          x: trayX || defaultX,
                          y: 0
                          });
    mainWindow.show();
  },

  hideMain() {
    mainWindow.hide();
  }
};


exports.windowEvents = windowEvents;
