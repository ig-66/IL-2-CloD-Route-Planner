const { app, BrowserWindow } = require('electron')
const path = require('path')

// Dynamic import for ES modules
let isDev;

(async () => {
	isDev = (await import('electron-is-dev')).default; // Use import and get the default export
})();

require('@electron/remote/main').initialize()

function createWindow() {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.join(__dirname, 'icon.ico'),
		webPreferences: {
			enableRemoteModule: true,
		},
	});

	window.loadURL(
		isDev
			? 'http://localhost:3000/'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);

	window.setMenuBarVisibility(false);
}

app.on('ready', () => {
	setTimeout(createWindow, 50);  // Ensure `isDev` is loaded before using it
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
