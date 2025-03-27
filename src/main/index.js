import { app, BrowserWindow, shell, Menu } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { connectDatabase, closeDatabase } from './database/config/db'
import icon from '../../resources/icon.png?asset'
import './database/controllers/index'

// Importa otros controladores aquí

async function setupDatabase() {
  try {
    await connectDatabase()

  } catch (error) {
    console.error('Failed to initialize database:', error)
    app.quit()
  }
}

// Configuración de la ventana
const windowState = {
  width: 900,
  height: 670,
  maximized: false
}

function createWindow() {
  // Crear la ventana principal
  const mainWindow = new BrowserWindow({
    ...windowState,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // Mostrar la ventana cuando esté lista
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    if (windowState.maximized) {
      mainWindow.maximize()
    }
  })

  // Manejar la apertura de enlaces externos
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Cargar la aplicación en desarrollo o producción
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Guardar el estado de la ventana al cerrar
  mainWindow.on('close', () => {
    windowState.maximized = mainWindow.isMaximized()
    if (!windowState.maximized) {
      const [width, height] = mainWindow.getSize()
      windowState.width = width
      windowState.height = height
    }
  })

  // Eliminar la barra de menu en produccion
  if (!is.dev) {
    Menu.setApplicationMenu(null)
  }
}

// Cuando la aplicación est lista
app.whenReady().then(async () => {
  await setupDatabase()
  createWindow()

  // Manejar el evento 'activate' en macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Cerrar la aplicación cuando todas las ventanas estén cerradas
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  await closeDatabase()
})
