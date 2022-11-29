console.log('[WatchRPC] Loaded Background Script')
let videoData 


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch(message.type){
        case "videodata":
            console.log(`[WatchRPC] [Background]: ${JSON.stringify(message.data)}`);
            videoData = message.data
            sendResponse("OK");
            break;
        case "getVideoData":
            console.log(`[WatchRPC] [Background]: Sending Video Data`)
            let jsonData = "ping back"
            sendResponse(videoData);
            chrome.runtime.sendMessage({type:"pause",data:``}, (response) => {console.log('t')});
            break;
    }


    // var videoElements = document.querySelectorAll("video");
    // await videoElements[0].play(); 

    // if (message.type === 'videodata') {
    //     console.log(message)
    //     console.log(message.data)
    //     sendResponse("OK");
    //     // chrome.runtime.sendMessage({type:"test",data:"testdata if you can read this i might be very happy"}, function(response) {
    //     //     console.log(response);
    //     // });
    // }
    // if(message.type === "test"){
    //     console.log(message)
    //     sendResponse('pingback')
    // }
  });





  