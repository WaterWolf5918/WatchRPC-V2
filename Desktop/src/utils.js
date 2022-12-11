/**
 * @param {number} currentSeconds
 * @param {number} totalSeconds
 * @returns {string} Formatted Time
 */



function formattedTimeBuilder(currentSeconds, totalSeconds){
	let returnv = [] // should have 2 strings [1]: 0:00 [2]: 1:00
	var cmins = Math.floor(currentSeconds / 60)
	var csecs = Math.floor(currentSeconds- cmins * 60)
	var tmins = Math.floor(totalSeconds / 60)
	var tsecs = Math.floor(totalSeconds - tmins * 60)
	console.log(`${tmins}:${tsecs}`)
	if (/^\d$/.test(csecs))  {
		csecs = `0${csecs}`
	}
	return [`${cmins}:${csecs}`,`${tmins}:${tsecs}`]
}


/**
 * 
 * @param {object} info read protocol.md 
 * @param {boolean} useVideoThumbnail  defines if VideoThumdnails from platform should be used
 */

function printTTY(info,useVideoThumbnail){
		// console.clear()
		console.log('--------------------------Video Info --------------------------')
		useVideoThumbnail ? console.log(`Using Video Thumbnails`) : console.log("Not Using Video Thumbnails")
		console.log(`${info[1].formatedTime[0]} / ${info[1].formatedTime[1]} | ${Math.round(info[1].timePercent)}%`)
		console.log(`Video Title: ${info[0].title}`)
		console.log(`Video Creater: ${info[0].creater}`)
		console.log(`Video Views: ${info[0].extra.views}`)
		console.log(`Video Likes: ${info[0].extra.likes}`)
		console.log(`Video URL: ${info[0].extra.url}`)
		console.log(`Video Thumbnail: ${info[0].thumbnail}`)
		console.log('---------------------------------------------------------------')
}



module.exports = {formattedTimeBuilder,printTTY}