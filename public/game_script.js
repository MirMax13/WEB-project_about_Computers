
var myGamePiece;
var myObstacles = [];
var myScore;
var scores = [];


function startGame() {
    myObstacles = []; // Очищаємо масив перешкод
    myGamePiece = new component(30, 30, "../image/smiley.webp", 10, 120, "image");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    clearInterval(myGameArea.interval); // Зупинка попереднього інтервал, якщо він є
    myGameArea.frameNo = 0;
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        var contentWidth = document.getElementById("content").offsetWidth;
        this.canvas.width = contentWidth;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.getElementById("content").appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp'|| e.key === 'w'|| e.key === 'W') {
                moveup();
            } else if (e.key === 'ArrowDown'|| e.key === 's'|| e.key === 'S') {
                movedown();
            } else if (e.key === 'ArrowLeft'|| e.key === 'a'|| e.key === 'A') {
                moveleft();
            } else if (e.key === 'ArrowRight'|| e.key === 'd'|| e.key === 'D') {
                moveright();
            }
        });
        window.addEventListener('keyup', function(e) {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown'|| e.key === 'w'|| e.key === 's'|| e.key === 'S'|| e.key === 'W'|| e.key === 'ArrowLeft'|| e.key === 'ArrowRight'|| e.key === 'a'|| e.key === 'd'|| e.key === 'A'|| e.key === 'D') {
                clearmove();
            }
        });
        
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        if (type == "image" ) {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPosObstacle = function() {
        this.x += this.speedX;
        this.y += this.speedY;     
    }
    this.newPosPiece = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Перевірка на межі канви
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
        if (this.y >= myGameArea.canvas.height - this.height) {
            this.y = myGameArea.canvas.height - this.height;
        }     
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            
            scores.push(myGameArea.frameNo);
            scores.sort(function(a, b) {
                return b - a;
            });
            var bestScores = "3 best results:\n";
            var worstScores = "3 worst results:\n";
            for (var i = 0; i < 3; i++) {
                if (scores[i] !== undefined) {
                    bestScores +=  (i + 1) + ") " + scores[i] + "\n";
                }
            }
            for (var i = scores.length - 1; i > scores.length - 4; i--) {
                if (scores[i] !== undefined) {
                    worstScores +=  (scores.length - i) + ") " + scores[i] + "\n";
                }
            }
            alert(bestScores + "\n" + worstScores);
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "#41b3b3", x, 0));
        myObstacles.push(new component(10, myGameArea.canvas.height - height - gap, "#41b3b3", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPosObstacle();
        myObstacles[i].update();
    }
    myScore.x = 10;
    myScore.y = 30;
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPosPiece();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    myGamePiece.image.src = "../image/smiley.png";
    myGamePiece.speedY = -2; 
}

function movedown() {
    myGamePiece.image.src = "../image/smiley.png";
    myGamePiece.speedY = 2; 
}

function moveleft() {
    myGamePiece.image.src = "../image/smiley.png";
    myGamePiece.speedX = -2; 
}

function moveright() {
    myGamePiece.image.src = "../image/smiley.png";
    myGamePiece.speedX = 2; 
}

function clearmove() {
    myGamePiece.image.src = "../image/smiley.webp";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

