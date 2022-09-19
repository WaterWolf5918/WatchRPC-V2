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
let time_info


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
rpc_info = {
	title: "Waiting For REST API",
	creater: "No Video",
	views: "",
	likes: "",
	url: "https://waterwolf.tk/404",
	thumbnail: "ytlogo2",
}

let closedialogSettings  = {
	buttons: ["Hide To Tray","Exit Program"],
	message: "Do you want to exit the program or hide it to the tray?",
	title: "Exit Program?",
	type: "question",
}




function createTray () {
  const icon = path.join(__dirname, 'app','ytlogo2.png') // required.
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
        width: 400,
        height: 425,
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
	Settingswindow.webContents.send('getstatus',nconf.get())
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
		time_info = {
			curruntTime: 0,
			totalTime: 0,
			timeP: 0,
			formatedTime: [0,0]
		}
		Mainwindow.webContents.send('video update', [rpc_info,{"time" : time_info, "timepercent" : time_info.timeP}])
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
		rpc_info = {
			title: title,
			creater: creater,
			views: views,
			likes: likes,
			url: url,
			thumbnail: thumbnail,
		}
	}
});



function printTTY(){
	if (nconf.get('showTTY')){
		console.log('\n\n--------------------------Video Info --------------------------')
		config.useVideoThumbnails ? console.log(`Using Video Thumbnails`) : console.log("Not Using Video Thumbnails")
		console.log(`${time_info.curruntTime} / ${time_info.totalTime} | ${Math.round(time_info.timeP)}%`)
		console.log(`Video Title: ${rpc_info.title}`)
		console.log(`Video Creater: ${rpc_info.creater}`)
		console.log(`Video Views: ${rpc_info.views}`)
		console.log(`Video Likes: ${rpc_info.likes}`)
		console.log(`Video URL: ${rpc_info.url}`)
		console.log(`Video Thumbnail: ${rpc_info.thumbnail}`)
		console.log('---------------------------------------------------------------')
	}
}




wabserver.post("/Time", (req, res) => {
	var {
		curruntTime,
		totalTime,
		timeP,
		formatedTime,
		service
	} = req.body;
	res.send(`Time[OK]`);
	time_info = {
		curruntTime: curruntTime,
		totalTime: totalTime,
		timeP: timeP,
		formatedTime: formatedTime
	}
		printTTY()
		nconf.get('useVideoThumbnails') ? image = rpc_info.thumbnail : image = "ytlogo2"       //config toggle for thumbnail  | if (config.useVideoThumbnails) {image = rpc_info.thumbnail}else{image = "ytlogo2"}
		if (service == nconf.get('mode')){
			rpc.setActivity({
				details: `${rpc_info.title}`,
				state: `By ${rpc_info.creater}\n ${time_info.formatedTime[0]}/${time_info.formatedTime[1]}`,
				largeImageKey:image,smallImageKey: "ytlogo2",
				smallImageText: "WatchRPC",
				large_text: `${rpc_info.views} ${rpc_info.likes}`,
				buttons: [{"label": "Watch Video", "url": rpc_info.url}],
				instance: false,
			})
			Mainwindow.webContents.send('video update', [rpc_info,{"time" : time_info, "timepercent" : time_info.timeP}])
		}else{
			return
		}
});


//electron imports

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
      largeImageKey: "ytlogo2",
      large_text: "Large Text Here!",
      buttons: [{"label": "Watch Video", "url": "https://google.com"}],
      instance: false,
    });
  }


//DISCORD RPC

server.listen(9494, () => {
    console.log(`Server listening on port 9494`);
    rpc.login({ clientId }).catch(console.error);
})