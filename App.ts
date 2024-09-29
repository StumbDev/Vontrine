// Suggested code may be subject to a license. Learn more: ~LicenseLog:636490218.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2688556212.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:723435869.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2279329305.
import { app, BrowserWindow } from 'electron';
import path from 'node:path';

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./src/ui.html')
}

app.whenReady().then(() => {
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
