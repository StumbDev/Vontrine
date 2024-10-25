const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')
const process = require('node:process')

let mainWindow;
let settingsWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
      icon: "./src/assets/icon.png"
    }
  })

  mainWindow.loadFile('src/browser.html')
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow, // Set the main window as the parent
    modal: true,        // Make it a modal window
    autoHideMenuBar: true,
    webPreferences: {
        webSecurity: false,  // Disable web security (for testing)
        contextIsolation: false, // Set to false if you're not using a preload script
        nodeIntegration: true // Enable node integration (if needed)
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  settingsWindow.loadFile('src/settings.html') // Load your settings HTML file

  settingsWindow.on('closed', () => {
    settingsWindow = null; // Clear reference on close
  });
}

// Create the application menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Window',
          click: () => {
            createWindow()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Go',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+Left',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.webContents.goBack()
            }
          }
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+Right',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.webContents.goForward()
            }
          }
        }
      ]
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Open Settings',
          click: createSettingsWindow
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            // Add functionality for the About dialog here
            console.log('About this application')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createMenu()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})