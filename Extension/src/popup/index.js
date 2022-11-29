


window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    let test = {
        "image": "https://lh3.googleusercontent.com/_E4nEdHgW97t9fTw2FanD1wdGsmBk-_ef__JrL2Rj5fPZEPAk2AT7exNmprYe0d3O-Cyp_sD462c-Q735w=w60-h60-l90-rj",
        "name":"not text",
        "creater":"not a string"
    }
    refreshINFO(test)
    try{
        chrome.runtime.sendMessage({type:"getVideoData",data:``}, (response) => {
            console.log('[WatchRPC] [popup] received: ', response);
            if (!response){console.log("[WatchRPC] [popup] No Data"); return}
            refreshINFO({
                "image": response.thumbnail,
                "name": response.title,
                "creater": response.creater
            })
        });
    }
    catch(err){
        console.log(err)
    }

    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //         console.log(`sender: ${sender}`)
    //       if (request.type == "test")
    //       console.log(request)
    //         sendResponse({farewell: "goodbye"});
    //     });
    //changeBackground('https://i.ytimg.com/vi/d1yTyAh8IA8/sddefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCghqEJQEGHgg6AJIWg&rs=AMzJL3nNyv3m1Fjgww4YRkkxdwNjaXSkMQ')
});



// document.getElementById('play').addEventListener('click',() => {
//     document.getElementById('play').classList.add('hide')
//     document.getElementById('pause').classList.remove('hide')
// })


/**
 * @param {String} url The background image url (https://i.imgur.com/*)
 */
function changeBackground(url){
    document.getElementById('popup-content').style.backgroundImage = `url('${url}')`
}



/**
 * Assign the project to an employee.
 * @param {Object} JSON - The employee who is responsible for the project.
 * @param {string} JSON.image - The name of the employee.
 * @param {string} JSON.name - The name of the employee.
 * @param {string} JSON.creater - The name of the employee.
 */
function refreshINFO(JSON = {
    "image": "",
    "name":"No Name",
    "creater":"No Creater"
}){
    changeBackground(JSON.image)
    document.getElementById("videoName").innerText = JSON.name
    document.getElementById("videoCreater").innerText = JSON.creater
}



/**
 * @param {String} int to start/stop video (1=start, 0=stop)
 */
function playPause(int){
    console.log('a')
    switch(int){
        case 1:
            console.log('Playing Video');
        case 0:
            console.log("Pauseing Video");
        default:
            console.error('Malformed Int, format (1 = play,0 = pause)')
            throw new Error("Malformed Int, format (1 = play,0 = pause)")
    }
}










