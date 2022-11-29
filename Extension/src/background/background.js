console.log('[WatchRPC] Loaded Background Script')
let videoData 




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch(message.type){
        case "videodata":
            console.log(`[WatchRPC] [Background]: ${JSON.stringify(message.data)}`);
            videoData = message.data;
            sendResponse("OK");
            break;
        case "getVideoData":
            console.log(`[WatchRPC] [Background]: Sending Video Data`)
            if (!videoData){
                sendResponse(false);
                return;
            }
            sendResponse(videoData);
            break;
    }
});


//port.postMessage({question: "Who's there?"});
//response

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
// chrome.runtime.onInstalled.addListener(() => {
//   //run on install
//   console.log('test')
//   chome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//     chome.declarativeContent.onPageChanged.addRules(
//       [
//         {
//           conditions: [
//             new chrome.declarativeContent.PageStateMatcher({
//               pageUrl: { hostSuffix: "youtube.com"}
//             })
//           ],
//           actions: [new chrome.declarativeContent.ShowAction()]
//         }
//       ]
//     )
//   })
// })











  