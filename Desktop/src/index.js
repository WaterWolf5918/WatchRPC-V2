if(require('electron-squirrel-startup')) return;
const DiscordRPC = require('discord-rpc');
const clientId = '995095535709081670';

DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const express = require("express")
const http = require("http")
const path = require('path');
const nconf = require('nconf')
nconf.use('file', { file: path.join(__dirname,"config.json") });
//RESTAPI imports
const wabserver = express();
const server = http.Server(wabserver);
const bodyParser = require("body-parser");
let config = nconf.get()
wabserver.use(bodyParser.json());

console.clear = () =>{
	console.log("\033[2J \033[H \033c ")
}


//RESTAPI
wabserver.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});
//RESTAPI





//electron imports
const { app, BrowserWindow, getCurrentWindow, ipcMain, Menu, nativeImage, Tray, dialog  } = require('electron');
const { electron } = require('process');
const e = require('express');

var io = require('socket.io')(server)
let old_info = {
	title: "Waiting For REST API",
	creater: "No Video",
	views: "",
	likes: "",
	url: "https://waterwolf.tk/404",
	thumbnail: "ytlogo4",
}


let info = [
	{
		"creater": "No Video",
        "title": "Waiting For REST API",
        "thumbnail": "ytlogo4",
        "extra":{
            "url": "https://google.com",
			"views": "0",
            "likes": "0"
        }
	},
	{
        "curruntTime": 0,
        "totalTime": 0,
        "timePercent": 0,
		"formatedTime": ["0:00","0:00"]
	}
]




let closedialogSettings  = {
	buttons: ["Hide To Tray","Exit Program"],
	message: "Do you want to exit the program or hide it to the tray?",
	title: "Exit Program?",
	type: "question",
}


function createTray () {
  const icon = path.join(__dirname, 'app','ytlogo4.png') // required.
  const trayicon = nativeImage.createFromPath(icon)
  tray = new Tray(trayicon.resize({ width: 16 }))
  const contextMenu = Menu.buildFromTemplate([
    {label: `Show App`, click: () => {
		mainWindow.show()
      }},
    {label: 'Quit', click: () => {
        app.quit()
      }},
  ])
  tray.setContextMenu(contextMenu)
}


let tray = null
let Mainwindow
let Settingswindow
	const createWindow = () => {
    Mainwindow = new BrowserWindow({
        width: 425,
        height: 300,
        resizable: false,		
        webPreferences: {
            contextIsolation: true,
			preload: path.join(__dirname, 'app','preload.js')
        },
        frame: false,
    });
    Mainwindow.loadFile(path.join(__dirname, '/app/index.html'));
	if (!tray) { createTray() }
	Mainwindow.on('closed',() => { Mainwindow = null })
}
const createWindow2 = () => {
    Settingswindow = new BrowserWindow({
        width: 600,
        height: 600,
        resizable: false,		
        webPreferences: {
            contextIsolation: true,
			preload: path.join(__dirname, 'app','preload.js')
        },
        frame: false,
    });
    Settingswindow.loadFile(path.join(__dirname, '/app/settings.html'));
	// Settingswindow.webContents.send('getstatus',nconf.get())
}



function printTTY(){
	if (nconf.get('showTTY')){
		console.clear()
		console.log('--------------------------Video Info --------------------------')
		config.useVideoThumbnails ? console.log(`Using Video Thumbnails`) : console.log("Not Using Video Thumbnails")
		console.log(`${info[1].formatedTime[0]} / ${info[1].formatedTime[1]} | ${Math.round(info[1].timePercent)}%`)
		console.log(`Video Title: ${info[0].title}`)
		console.log(`Video Creater: ${info[0].creater}`)
		console.log(`Video Views: ${info[0].extra.views}`)
		console.log(`Video Likes: ${info[0].extra.likes}`)
		console.log(`Video URL: ${info[0].extra.url}`)
		console.log(`Video Thumbnail: ${info[0].thumbnail}`)
		console.log('---------------------------------------------------------------')
	}
}


ipcMain.handle('controls',(event,arg) => {
	switch (arg) {
		case "minimize":
			console.log("[ipcMain] [window control] > minimize")
			Mainwindow.minimize();
			break;
		case "close":
			if (BrowserWindow.getFocusedWindow() == Mainwindow) {
				console.log("[ipcMain] [window control] > close")
				dialog.showMessageBox(closedialogSettings)
				.then((result) => { Boolean(result.response) ? app.quit() : Mainwindow.hide();/** if response is true, hide window, else quit app */})
			} else {
				console.log("[ipcMain] [window control] > close")
				BrowserWindow.getFocusedWindow().close();
			}
			break;
		case "max":
			console.log("[ipcMain] [window control] > max")
			Mainwindow.maximize();
			break;
		default:
			console.log(`[ipcMain] [window control] > ${arg}`)
	}
}) 


ipcMain.handle('settings',(event,arg) => {
	console.log(`[ipcMain] [settings] > settings`)
	createWindow2();
})





ipcMain.handle('status',(event,args) => {
	console.log(args)
	if (nconf.get('mode') !== args.Service){
		info[1].curruntTime = 0
		info[1].totalTime = 0
		info[1].timePercent= 0
		info[1].formatedTime = ["0:00","0:00"]
		sendUpdate()
	}
	nconf.set('mode',args.Service)
	nconf.set('showTTY',args.showTTy)
	nconf.set('useVideoThumbnails',args.useVideo)
	nconf.save()
})
ipcMain.handle('getStatus',() => nconf.get())


wabserver.post("/YTmusic", (req, res) => {
	const {
		title,
		creater,
		views,
		likes,
		url,
		time,
		thumbnail
	} = req.body;
	res.send(`YTmusic[OK]`);
	if (nconf.get('mode') == "ytmusic"){
		info[0].creater = creater
		info[0].title = title
		info[0].thumbnail = thumbnail
		info[0].extra = {
			url: url,
			views: views,
			likes: likes
		}
	}
});











wabserver.post("/Time", (req, res) => {
	var {
		curruntTime,
		totalTime,
		timeP,
		formatedTime,
		service
	} = req.body;
	res.send(`Time[OK]`);
	info[1] = {
		curruntTime: curruntTime,
		totalTime: totalTime,
		timePercent: timeP,
		formatedTime: formatedTime
	}
		printTTY()
		nconf.get('useVideoThumbnails') ? image = info[0].thumbnail : image = "ytlogo4"       //config toggle for thumbnail  | if (config.useVideoThumbnails) {image = info[0].thumbnail}else{image = "ytlogo4"}
		if (service == nconf.get('mode')){ // check to see if the services is selected
			sendUpdate()
		}else{
			return
		}
});


app.whenReady().then(() => {
    createWindow();
})




//DISCORD RPC
rpc.on('ready', () => {
	console.log("Ready");
	setActivity();
});

async function setActivity() {
    rpc.setActivity({
      details: "Waiting For REST API",
      largeImageKey: "ytlogo4",
      large_text: "Large Text Here!",
      buttons: [{"label": "Watch Video", "url": "https://google.com"}],
      instance: false,
    });
  }


function sendUpdate(){
	// code to refresh RPC and send update to gui
	rpc.setActivity({
		details: `${info[0].title} ${info[1].formatedTime[0]} / ${info[1].formatedTime[1]}`,
		state: `By ${info[0].creater}`,
		largeImageKey: `${info[0].thumbnail}`,
		smallImageKey: `ytlogo4`,
		smallImageText: "WatchRPC v2",
		largeImageText: `${info[1].formatedTime[0]} / ${info[1].formatedTime[1]} | ${Math.round(info[1].timePercent)}%`,
		buttons: [{"label": "Watch Video", "url":`${info[0].extra.url}`}],
		instance: false,
	})

	Mainwindow.webContents.send('infoUpdate',info)
	
}



//DISCORD RPC

server.listen(9494, () => {
    console.log(`Server listening on port 9494`);
    rpc.login({ clientId }).catch(console.error);
})