const { app, BrowserWindow, Tray } = require('electron')
const path = require('path')
const colors = require('./style/colors')

const createWindow = () => {
   const appIcon = new Tray(path.join(__dirname, "../img/NoteSpace-Logo.png"))

   const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 320,
      resizable: true,
      show: false,
      backgroundColor: colors.background,
      icon: path.join(__dirname, "../img/NoteSpace-Logo.png"),
      webPreferences: {
         nodeIntegration: true,
         preload: path.join(__dirname, 'preload.js'),
         devTools: true,
         contextIsolation: false
      }
   })

   mainWindow.on('ready-to-show', mainWindow.show)

   mainWindow.loadFile(path.join(__dirname, "index.html"))
}

app.on("ready", createWindow)

app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length == 0) createWindow()
})

app.on('window-all-closed', () => {
   // quit app when all windows are closed.
   if(process.platform !== 'darwin') app.quit()
})