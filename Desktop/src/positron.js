const { app, BrowserWindow, getCurrentWindow, ipcMain, Menu, nativeImage, Tray, dialog  } = require('electron');
const path = require('path')
const closedialogSettings  = {
	buttons: ["Hide To Tray","Exit Program"],
	message: "Do you want to exit the program or hide it to the tray?",
	title: "Exit Program?",
	type: "question",
}

/**
 * @param {string} WinControl a string of any of the following [minimize,close,max]
 */
function handleWinControls(WinControl){
    switch (WinControl) {
		case "minimize":
			console.log("[ipcMain] [window control] > minimize");
            BrowserWindow.getFocusedWindow().minimize()
			// Mainwindow.minimize();
			break;
		case "close":
			if (BrowserWindow.getFocusedWindow().id == 1) {
				console.log("[ipcMain] [window control] > close")
				dialog.showMessageBox(closedialogSettings)
				.then((result) => { Boolean(result.response) ? app.quit() : BrowserWindow.getFocusedWindow().hide();/** if response is true, hide window, else quit app */})
			} else {
				console.log("[ipcMain] [window control] > close")
				BrowserWindow.getFocusedWindow().close();
			}
			break;
		case "max":
			console.log("[ipcMain] [window control] > max")
			BrowserWindow.getFocusedWindow().maximize();
			break;
		default:
			console.log(`[ipcMain] [window control] > ${arg}`)
	}
}


function createBasicTray(tray,window) {
    const icon = path.join(__dirname, 'app','ytlogo4.png') // required.
    const trayicon = nativeImage.createFromPath(icon)
    tray = new Tray(trayicon.resize({ width: 16 }))
    const contextMenu = Menu.buildFromTemplate([
        {label: `Show App`, click: () => {
            window.show()
        }},
        {label: 'Quit', click: () => {
            app.quit()
        }},
    ])
    tray.setContextMenu(contextMenu)
}   



module.exports = {handleWinControls,createBasicTray}