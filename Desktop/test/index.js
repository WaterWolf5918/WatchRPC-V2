var time = 0
var start
var stop




start = Date.now();
setTimeout(() => {
    stop = Date.now();
    time = stop - start
    console.log(Math.floor(time/1000))
}, 2000);


