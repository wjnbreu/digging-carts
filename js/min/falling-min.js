var ctx;

var imgBg;

var imgDrops;

var x = 0;

var y = 0;

var noOfDrops = 50;

var fallingDrops = [];

function drawBackground() {
    ctx.drawImage(imgBg, 0, 0);
}

function draw() {
    drawBackground();
    for (var r = 0; r < noOfDrops; r++) {
        ctx.drawImage(fallingDrops[r].image, fallingDrops[r].x, fallingDrops[r].y);
        fallingDrops[r].y += fallingDrops[r].speed;
        if (fallingDrops[r].y > 450) {
            fallingDrops[r].y = -25;
            fallingDrops[r].x = Math.random() * 600;
        }
    }
}

function setup() {
    var r = document.getElementById("canvas");
    r.width = window.innerWidth;
    r.height = window.innerHeight;
    if (r.getContext) {
        ctx = r.getContext("2d");
        imgBg = new Image();
        imgBg.src = "http://lorempixel.com/600/600/sports/";
        setInterval(draw, 36);
        for (var a = 0; a < noOfDrops; a++) {
            var n = new Object();
            n["image"] = new Image();
            n.image.src = "http://lorempixel.com/10/10/sports/";
            n["x"] = Math.random() * 600;
            n["y"] = Math.random() * 5;
            n["speed"] = 3 + Math.random() * 5;
            fallingDrops.push(n);
        }
    }
}

setup();