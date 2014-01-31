/*
    all credit for this code goes to:
        http://www.mattcrouch.net/experiments/HTML5-space/
*/

function Star() {
    this.x;
    this.y;
    this.radius;

    this.draw = function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }
};



$(function () {
    var canvas = $('#myCanvas');
    var context = canvas.get(0).getContext("2d");
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();
    var stars = [];

    //context.strokeRect(40,40,100,100);

    //context.beginPath();
    //context.moveTo(40,40);
    //context.lineTo(340,340);
    //context.stroke();

    //context.beginPath();
    //context.arc(230,90,50,0,Math.PI*2,false);
    //context.stroke();
    //context.closePath();
    //context.fill();

    //	context.fillStyle = "rgba(0,0,255,1)";
    //	context.fillRect(40,40,100,100);
    //	context.fillRect(180,40,100,100);
    //	context.fillStyle = "rgba(0,0,0,1)";
    //	context.fillRect(320,40,100,100);

    //	context.strokeStyle = "rgba(255,0,0,1)";
    //	context.strokeRect(40,40,100,100);
    //	context.strokeRect(180,40,100,100);
    //	
    //	context.lineWidth = 5;
    //	context.strokeStyle = "rgba(255,0,0,1)";
    //	context.beginPath;
    //	context.moveTo(40,180);
    //	context.lineTo(420,180);
    //	context.stroke();
    //	
    //	context.lineWidth=20;
    //	context.strokeStyle = "black";
    //	context.beginPath();
    //	context.moveTo(40,220);
    //	context.lineTo(420,220);
    //	context.stroke();

    //	var text = "ROFLOL";
    //	context.font="80px sans-serif";
    //	context.strokeText(text, 40,40);


    //	context.fillRect(40,40,100,100);
    //	context.beginPath();
    //	context.arc(230,90,50,0,Math.PI*2,false);
    //	context.closePath();
    //	context.fill();
    //	
    //	context.clearRect(0,0,canvas.width(), canvas.height());

    function resizeCanvas() {
        canvas.attr("width", $(window).width());
        canvas.attr("height", $(window).height());

        var oldCanvasWidth = canvasWidth;
        var oldCanvasHeight = canvasHeight;

        canvasWidth = canvas.width();
        canvasHeight = canvas.height();

        var xRatio = canvasWidth / oldCanvasWidth;
        var yRatio = canvasHeight / oldCanvasHeight;

        for (var i = 0; i < stars.length; i++) {
            context.fillStyle = "white";
            stars[i].x *= xRatio;
            stars[i].y *= yRatio;
            stars[i].draw(context);
        }
    }


    for (var i = 0; i < 50; i++) {
        var star = new Star();
        star.x = Math.random() * canvasWidth;
        star.y = Math.random() * canvasHeight;
        star.radius = Math.random() * 3;
        stars.push(star);
    }

    resizeCanvas();

    $(window).resize(resizeCanvas);
});