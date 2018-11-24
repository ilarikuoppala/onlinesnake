// Change this to match server address
var wsurl = "ws://onlinesnake.fun:8765/";



var canvas = document.createElement('canvas');
canvas.setAttribute('width', 800);
canvas.setAttribute('height', 540);
canvas.setAttribute('tabindex', 1);
canvas.setAttribute('id', 'game-canvas')
canvas.addEventListener('keydown', function(event) {
    if (event.key == 'F5') {
        location.reload();
    };
    if (event.key == 'r') {
        location.reload();
    };
    ws.send(event.key);
    event.preventDefault();
});

var ctx = canvas.getContext("2d");

var blocksize = 10;
var headcolor = 'red';
var bodycolor = 'lightred';
var bgcolor = 'white';
var offset = 20;

var ws = new WebSocket(wsurl);

ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    drawsquare(data.treats[0], 'blue')
    drawscore(data.scores);
    for (var i=0; i < data.clear.length; i++) {
        drawsquare(data.clear[i], bgcolor);
    };
    for (var i=0; i < data.worms.length; i++) {
        var worm = data.worms[i];
        drawsquare(worm.newhead, headcolor);
        drawsquare(worm.oldhead, bodycolor);
        drawsquare(worm.tail, bgcolor);
    };
};

var drawborders = function() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(offset - blocksize, offset -blocksize, blocksize * 52, blocksize)
    ctx.fillRect(offset - blocksize, offset -blocksize, blocksize, blocksize*52)
    ctx.fillRect(offset + blocksize*50, offset -blocksize, blocksize, blocksize * 52)
    ctx.fillRect(offset - blocksize, offset + blocksize * 50, blocksize * 52, blocksize)
};
drawborders();

var drawsquare = function(coords, color) {
    var x = coords[0];
    var y = coords[1];
    ctx.fillStyle = color;
    ctx.fillRect(offset + x*blocksize, offset + y*blocksize,blocksize,blocksize);
};

var drawscore = function(scores) {
    ctx.fillStyle = bgcolor;
    ctx.fillRect(blocksize*54, blocksize*2, 500, 500)
    ctx.fillStyle = 'black';
    ctx.font = "20px Arial";
    for (var i=0; i < scores.length; i++) {
        ctx.fillText(scores[i], blocksize*54, blocksize*4+20*i);
    };
};
document.body.appendChild(canvas);
canvas.focus();
