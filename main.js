const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;



if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });
}



require("electron-reload")(path.join(__dirname, "dist"), {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(
    `file://${path.join(__dirname, "dist/ibprojection/browser/index.html")}`
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
