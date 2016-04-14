'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;

let mainWindow;
let pomoWindow;
let appIcon;
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
    mainWindow.setFullScreenable(true);
    mainWindow.setKiosk(true);
    mainWindow.setResizable(false);
    mainWindow.setMovable(false);
    mainWindow.setMinimizable(false);
    mainWindow.setClosable(false);
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setSkipTaskbar(true);
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setAutoHideMenuBar(true);
    mainWindow.show();
  },

  renderMain() {
    pomo = false;

    mainWindow.setKiosk(false);
    mainWindow.setResizable(true);
    mainWindow.setMovable(true);
    mainWindow.setMinimizable(true);
    mainWindow.setFullScreenable(false);
    mainWindow.setClosable(true);
    mainWindow.setAlwaysOnTop(false);
    mainWindow.setSkipTaskbar(false);
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.setVisibleOnAllWorkspaces(false);
    mainWindow.setAutoHideMenuBar(false);
    mainWindow.show();
    mainWindow.setBounds({width: 300,
                          height: 400,
                          frame: false,
                          x: trayX || defaultX,
                          y: 0
                          });

  },

  hideMain() {
    mainWindow.hide();
  }
};


exports.windowEvents = windowEvents;
