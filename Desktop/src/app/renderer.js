



function button(text) {
	switch (text) {
		case "index":
			console.log('t')
			location.href = "index.html";
			break;
		case "settings":
			location.href = "settings.html";
			break;
	}
}

document.getElementById('close_button').addEventListener('click', (event) => {
	console.log(event)
	console.log(`Current Service: ${document.getElementById("services").value}`)
	console.log(`showTTY: ${document.getElementById("TTY").checked}`)
	console.log(`useVideoThumbnails: ${document.getElementById("uVT").checked}`)
	window.settings.status({
		"showTTy": document.getElementById("TTY").checked,
		"useVideo":document.getElementById("uVT").checked,
		"Service": `${document.getElementById("services").value}`
	})
	window.controls.close();
})




  

// document.getElementById('checkbox-help').addEventListener('mouseover', (event) => {
// 	console.log(event)
// 	document.getElementById('checkbox-help-text').style.display = "block"
// 	setTimeout(() => {
// 		document.getElementById('checkbox-help-text').style.display = "none";
// 	}, 5000);
// },false);
// function checkboxHelp(){
// 	console.log(document.getElementById('checkbox-help'))
// }




windowAction = {
    minimize: () => {
        window.controls.minimize();
    },
    close: () => {
        window.controls.close();
    },
}









