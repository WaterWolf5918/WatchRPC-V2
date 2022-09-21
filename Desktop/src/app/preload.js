const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('controls', {
    minimize: () => ipcRenderer.invoke('controls', 'minimize'),
    max: () => ipcRenderer.invoke('controls', 'max'),
    close: () => ipcRenderer.invoke('controls', 'close'),
    size: (arg) => ipcRenderer.invoke('size', arg),
})


contextBridge.exposeInMainWorld('settings', {
    settings: () => ipcRenderer.invoke('settings', 'settings'),
    status: (arg) => ipcRenderer.invoke('status', arg),
    getStatus: () => ipcRenderer.invoke('getStatus')
})


// ipcRenderer.on('getstatus',(event,data) => {
//     console.log(data)
//         window.onload( () =>{
//             document.getElementById("services").value = 'test'
//             document.getElementById("TTY").checked = Boolean(data.showTTY)
//             document.getElementById("TTY").checked = Boolean(data.showTTY)
//     })


    


//     console.log(`Current Service: ${document.getElementById("services").value}`)
// 	console.log(`showTTY: ${document.getElementById("TTY").checked}`)
// 	console.log(`useVideoThumbnails: ${document.getElementById("uVT").checked}`)
// })


ipcRenderer.on('video update',(event,data) => {
    if (location.href.includes('index.html')) {
        let videoName = data[0].title;
        let videoCreater = data[0].creater;
        document.getElementById('VideoName').innerText = videoName;
        document.getElementById('VideoCreater').innerText = videoCreater;
        if (data[0].thumbnail == "ytlogo2"){
            document.getElementById('rpc_image').style.backgroundImage = `url(https://i.imgur.com/weVZmih.png)`;
        }else{
            document.getElementById('rpc_image').style.backgroundImage = `url(${data[0  ].thumbnail})`;
        }
            document.getElementById('TimeBar')
            .style.width = data[1].timepercent + "%";
            console.log(data[1].time)
            document.getElementById('Time')
            .innerText = `${data[1].time.formatedTime[0]} / ${data[1].time.formatedTime[1]}`
    }
})


// if (location.href.includes('index.html')) {
//     ipcRenderer.invoke('size', [400,425]);
// 	console.log('index');
// }else if (location.href.includes('settings.html')) {
//     ipcRenderer.invoke('size', [600,425]);
// 	console.log('settings');
// }