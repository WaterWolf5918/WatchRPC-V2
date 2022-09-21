
// browser.runtime.onMessage.addListener((message, sender) => {
//   const { type, data } = message;
//   console.log('data:')
//   console.log(type + ' ' + data)
//   browser.runtime.sendMessage({
//     msg: "test", 
//     data: {
//         subject: "test",
//     }
// });


// browser.runtime.onMessage.addListener((request) => {
// 	console.log("Message from the Web script:");
// 	console.log(request);
//   browser.runtime.sendMessage({
//     msg: "Message from background",
//     data: {
//       subject: "Hello from discord "
//     }
//   })
// 	return Promise.resolve({ response: "Data OK" });
// })
