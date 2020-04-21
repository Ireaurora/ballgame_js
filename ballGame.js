    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var pressright = false;
    var pressleft = false;
    var ballr = 10;
    var rect_height = 10;
    var rect_width = 75;
    var rect =(canvas.width-rect_width)/2;
    var cbriks = 3;
    var rbriks = 4;
    var brikw = 75;
    var brikh = 20;
    var brikpadding = 10;
    var brikleft = 30;
    var briktop = 30;
    var score = 0;
    var lives = 5;
    var briks = [];
    for (var c=0; c<cbriks; c++) {
        briks[c] = [];
        for (var r=0; r<rbriks; r++) {
            briks[c][r] = {x: 0, y: 0, status:1 };
        }
    }
    document.addEventListener("keydown", KeyDownHandler, false);
    document.addEventListener("keyup", KeyUpHandler, false);
    document.addEventListener("mousemove",mouseMoveHandler, false);

    //movement with the keyboard function
    function KeyDownHandler(e) {
        if(e.keyCode === 39) {
            pressright = true;
        }
        else if (e.keyCode === 37) {
            pressleft = true;
        }
    }
    function KeyUpHandler(e) {
        if (e.keyCode === 39) {
            pressright = false;
        }
        else if (e.keyCode === 37) {
            pressleft = false;
        }
    }
    function mouseMoveHandler(e){
        var relx = e.clientX - canvas.offsetLeft;
        if(relx> 0 && relx < canvas.width) {
            rect = relx - rect_width/2;
        }
    }
    // this function detects collision
    function detectcollision() {
        for(var c=0; c<cbriks; c++) {
            for(var r=0; r<rbriks; r++) {
                var b = briks[c][r];
                if(b.status === 1){
                    if (x>b.x && x<b.x+ brikw &&  y> b.y && y<b.y+brikh){
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score === rbriks*cbriks) {
                            alert("You win!! Congratulations");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
    //this function calculates the score
    function upscore() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Score:" + score, 8, 20);
    }
    function uplives() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Lives:" + lives, canvas.width-65, 20);
    }


    // this function creates the ball
    function game() {
        ctx.beginPath();
        ctx.arc(x, y, ballr, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
    //this function creates the rectangle the ball returns to
    function gamerect() {
        ctx.beginPath();
        ctx.rect(rect, canvas.height-rect_height, rect_width,rect_height);
        ctx.fillStyle= "white";
        ctx.fill();
        ctx.closePath();
    }
    //this function creates the rectangles the ball has to hit
    function drawbriks() {
        for(var c=0; c<cbriks; c++) {
            for (var r=0; r< rbriks; r++){
                if(briks[c][r].status === 1){
                    var brikY = (c*(brikh+brikpadding))+briktop;
                    var brikX = (r*(brikw+brikpadding))+brikleft;
                    briks[c][r].x = brikX ;
                    briks[c][r].y = brikY ;
                    ctx.beginPath();
                    ctx.fillStyle = randomcolor();
                    ctx.rect(brikX,brikY,brikw,brikh);
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    // this function runs the other functions
    function ballgame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawbriks();
        game();
        gamerect();
        upscore();
        uplives();
        detectcollision();

        if (y + dy < 0) {
            dy = -dy;
        }
        if (y + dy > canvas.height) {
            dy = -dy;
        }
        if (x + dx < 0) {
            dx = -dx;
        }
        if (x + dx > canvas.width) {
            dx = -dx;
        }
        else if (y+ dy > canvas.height-ballr) {
            if (x > rect && x < rect + rect_width) {
                dy = -dy;
            }
            else {
                lives --;
                if(!lives) {
                    alert("Game Over!");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    rect = (canvas.width-rect_width)/2;
                }
            }
        }
        if(pressright && rect < canvas.width-rect_width) {
            rect += 7;
        }
        if(pressleft && rect >0 ) {
            rect -= 7;
        }
        x += dx;
        y += dy;
        requestAnimationFrame(ballgame);
    }
    ballgame();

    //setting the color of the briks to a random chosen color
    //Not working 
    function randomcolor(){
        var sign = "0123456789ABCDEF";
        var component = "#";
        var i;
        for (var i=0; i<6 ; i++) {
            component += sign[Math.floor(Math.random()*15)];
        }
        return component;
    }