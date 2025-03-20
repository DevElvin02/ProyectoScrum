const { app, BrowserWindow, ipcMain } = require('electron')
// const path = require('path')
const db = require('./database')

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadFile('index.html')
})

// Recibe la petición del frontend y envía los pedidos desde la base de datos
ipcMain.handle('get-pedidos', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pedidos', [], (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
})
