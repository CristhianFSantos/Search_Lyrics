const { app, BrowserWindow, Tray } = require("electron");
let mainWind;
app.on("ready", createWindow);

function createWindow() {
  mainWind = new BrowserWindow({
    width: 600,
    height: 800,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,

    icon: __dirname + "/icon.png",
    show: false,
  });
  const icon = new Tray(__dirname + "/icon.png");
  mainWind.loadURL(`file://${__dirname}/index.html`);
  mainWind.once("ready-to-show", () => mainWind.show());
}
