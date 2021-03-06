// Modules to control application life and create native browser window
const { dialog, app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

let menuWindow, desktopWindow;

function createWindow() {
	const screenSize = require('electron').screen.getPrimaryDisplay().size;
	
	// Create the menu

	menuWindow = new BrowserWindow({
		width: screenSize.width,
		height: 56,
		x: 0,
		y: screenSize.height - 56,
		resizable: false,
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, "../menu/preload.js")
		}
	});

	desktopWindow = new BrowserWindow({
		width: screenSize.width,
		height: screenSize.height - 56,
		x: 0,
		y: 0,
		resizable: false,
		frame: false,
		backgroundColor: "#2D3748"
	});

	menuWindow.loadFile(path.join(__dirname, "./web/index.html"));

	menuWindow.setMenu(null);
	desktopWindow.setMenu(null);

	// Open DevTools if it's enabled.

	//menuWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.

		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
