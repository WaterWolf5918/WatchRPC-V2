console.log('[WatchRPC] Loaded Background Script')
let videoData
let timedata




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch(message.type){
        case "videodata":
            console.log(`[WatchRPC] [Background]: ${JSON.stringify(message.data)}`);
            videoData = message.data;
            sendResponse("OK");
            sendFetch(videoData);
            break;
        case "getVideoData":
            console.log(`[WatchRPC] [Background]: Sending Video Data`)
            if (!videoData){
                sendResponse(false);
                return;
            }
            sendResponse(videoData);
            break;
        case "timedata":
            timedata = message.data
            sendResponse("OK");
            sendTime(timedata)
            break;
    }
});



/** 
 * @param {Object} info The json object that contains the video info [browser only] (Doesn't use the protocol) 
*/
function sendFetch(videoData){
	fetch("http://localhost:9494/YTmusic", {
    	method: 'POST',
    	headers: {
    	    'Accept': 'application/json',
    	    'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(videoData)
	})
	.then(response => response.json())
	.then(response => console.log(JSON.stringify(response)))
}




function sendTime(timeData){
    console.log(timeData)
    fetch("http://localhost:9494/time", {
    	method: 'POST',
    	headers: {
    	    'Accept': 'application/json',
    	    'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(timeData)
	})
	.then(response => response.json())
	.then(response => console.log(JSON.stringify(response)))
}




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











  