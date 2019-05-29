let canvas = document.getElementById("game-board");
let ctx = canvas.getContext("2d");
let d;

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.dx = 5;
    this.dy = 5;
    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
    this.painting = function () {
        ctx.beginPath();
        ctx.clearRect(0, 0, 1000, 500);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FF0000";
        ctx.closePath();
    };
    this.connect = function (ad, am) {
        this.bars = ad;
        this.array = am;
    };
    this.borderCollision = function () {
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.dx = -this.dx;
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
            this.dy = -this.dy;
        }
        if (this.y + this.radius > this.bars.y - this.bars.h && this.x + this.radius >= this.bars.x && this.x - this.radius <= this.bars.x + this.bars.w) {
            this.dy = -this.dy;
        }
        // for (let i = 0; i < 2; i++) {
        //     for (let j = 0; j < 4; j++) {
        //         if (this.y + this.radius > this.array.bl[j].y - this.array.bl[j].h && this.x + this.radius >= this.array.bl[j].x && this.x - this.radius <= this.array.bl[j].x + this.array.bl[j].w) {
        //             this.array.bl[j].kt = false;
        //         }
        //     }
        // }
    };
}

function Bars(x, y) {
    this.x = x;
    this.y = y;
    this.w = 200;
    this.h = 10;
    this.spees = 10;
    this.painting = function () {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.fillStyle = "#FF0000";
        ctx.closePath();
    };
    this.move = function (event) {
        if (event.keyCode == 37) {
            d = "sangTrai";
        } else if (event.keyCode == 39) {
            d = "sangPhai";
        }

    };
}

// function Array() {
//     this.array = [];
//     this.bl = [];
//     this.createArray = function () {
//         for (let i = 0; i < 2; i++) {
//             this.array.push(this.bl);
//             for (let j = 0; j < 4; j++) {
//                 this.bl.push({x: j * 5, y: j * 5, w: 100, h: 20, kt: true});
//                 if (this.bl[j].kt) {
//                     ctx.beginPath();
//                     ctx.fillRect(this.bl[j].x, this.bl[j].y, this.bl[j].w, this.bl[j].h);
//                     ctx.fill();
//                     ctx.fillStyle = "#FF0000";
//                     ctx.closePath();
//                 }
//             }
//         }
//     };
//
// }

let ball = new Ball(500, 250);
let bars = new Bars(400, 500 - 10);
let array = new Array();
document.addEventListener('keydown', bars.move);
let GameOver = true;

function gameload() {
    if (GameOver) {
        ball.painting();
        ball.move();
        ball.connect(bars, array);
        ball.borderCollision();
        bars.painting();
        // array.createArray();
        console.log(array.array);
        if (d == "sangTrai" && bars.x > 0) {
            bars.x -= bars.spees;
        }
        if (d == "sangPhai" && bars.x < 1000 - 200) {
            bars.x += bars.spees;
        }
        if (ball.y > 500 - 20) {
            GameOver = false;
        }
        requestAnimationFrame(gameload);
    } else {
        alert("game over");
    }
}

gameload();