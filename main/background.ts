import { app,ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import electronWindowState from 'electron-window-state';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();



  const mainWindowState = electronWindowState({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  const mainWindow = createWindow('main', {
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    minWidth: 640,
    transparent: true,
    visualEffectState: 'active',
    vibrancy: 'under-window',
    height: mainWindowState.height,
    webPreferences: {
      preload: './preload.js',
      webgl: true,
      sandbox: false,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      spellcheck: false, // FIXME: enable?
    }
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
  
  ipcMain.handle('app-get-path', async (event, name) => {
    return app.getPath("documents");
  });

  // ipcMain.on('message-from-renderer', (event, message) => {
  //   console.log(message);
  // });

})();

app.on('window-all-closed', () => {
  app.quit();
});
