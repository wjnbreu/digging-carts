var ctx;
var imgBg;
var imgDrops;
var x = 0;
var y = 0;
var noOfDrops = 10;
var fallingDrops = [];
var fallingIcons = [
    'Blue-Falcon.gif',
    'Gameboy-Advance-ico.gif',
    'KirbyHead.png',
    'LinkHead.png',
    'Gameboy-Advance-ico.gif',
    'sword.gif',
    'triforce.png',
    'WarioHead.png',
    'YoshiHead.png'
];



    function drawBackground(){
        // ctx.drawImage(imgBg, 0, 0); //Background
        var width = $(window).width();
        var height = $(window).height();
        ctx.clearRect(0,0,width, height);
    }

    function draw() {
        drawBackground();
        var width = $(window).width();
        var height = $(window).height();

        for (var i=0; i< noOfDrops; i++)
        {
        ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop

        fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
        if (fallingDrops[i].y > height){  //Repeat the raindrop when it falls out of view
            fallingDrops[i].y = -25; //Account for the image size
            fallingDrops[i].x = Math.random() * width;    //Make it appear randomly along the width    
        }
        
        }
    }

    function ranIcon(){
        var length = fallingIcons.length;
        var ranNum = Math.floor(Math.random() * length);
        return ranNum;
    }

    function setup() {
        var width = $(window).width();
        var height = $(window).height();

        var canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            setInterval(draw, 25);
            for (var i = 0; i < noOfDrops; i++) {
                var fallingDr = {};
                fallingDr["image"] = new Image();
                fallingDr["image"].height = 25;
                fallingDr.image.src = 'img/icons/' + fallingIcons[ranIcon()];
                
                fallingDr["x"] = Math.random() * canvas.width;
                fallingDr["y"] = Math.random() * 5;
                fallingDr["speed"] = 3 + Math.random() * 5;
                fallingDrops.push(fallingDr);
            }
        }
    }




setup();
