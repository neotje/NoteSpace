const { app, BrowserWindow } = require('electron')
const path = require('path')
const colors = require('./style/colors')

const createWindow = () => {
   const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: true,
      show: false,
      backgroundColor: colors.background,
      webPreferences: {
         nodeIntegration: true
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