function sendMessageToTabs(tabs,type,msg) {
    for (const tab of tabs) {
      browser.tabs
        .sendMessage(tab.id, { type : type, msg: msg })
        .then((response) => {
          console.log("Message from the content script:");
          console.log(response.response);
        })
        .catch(onError);
    }
}
  
document.getElementById('test').addEventListener('click',() => {
    browser.tabs
    .query({
        currentWindow: true,
        active: true, 
    })
    .then(sendMessageToTabs(this,'getvideo','getVideo'))
    .catch(onError);
})






window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    browser.tabs.query({currentWindow: true,active: true},(tabs) => {
        console.log(tabs)
    })
    
    // (sendMessageToTabs('getvideo','getVideo'))

});


browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request,sender)
})


// browser.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(request)
//         if (request.msg === "test") {
//             //  To do something
//             console.log(request.data)
//         }
//     }
// );

// browser.runtime.onMessage.addListener((request) => {
// 	console.log("Message from the background script:");
// 	console.log(request.data);
// 	return Promise.resolve({ response: "Data OK" });
// });



browser.browserAction.onClicked.addListener(() => {
    browser.tabs
      .query({
        currentWindow: true,
        active: true,
      })
      .then(sendMessageToTabs)
      .catch(onError);
  });