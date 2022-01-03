
///page reload
function refreshPage(){
    window.location.reload();
} 

///vehicle construction
class RaceCar {
    constructor(params) {
        this.x = (params && params.x) || 430;
        this.y = (params && params.y) || 125;
        this.colour = (params && params.colour) || "red";
        this.wcolour = (params && params.wcolour) || "pink";
        this.xDirection = params.xDirection || 10; 
       
        this.number = (params && params.number) || cars.length;
    }
    
    draw() {
        this.drawRaceCar(this.x, this.y, this.colour, this.wcolour);
    }

    ///moves
    move() {
        
        if (this.x == -550) {
            alert("The WINNER is CAR no." + this.number);
            refreshPage();
        }

        this.x -= this.xDirection;
    }
    
    
    drawRaceCar(x, y, colour, wcolour) {

        ///body
        ctx.fillStyle = colour;
        ctx.beginPath();

        ctx.moveTo(x + 530, y + 0);
        ctx.lineTo(x + 760, y - 100);
        ctx.lineTo(x + 760, y + 0);

        ctx.fill();

        ///wheels
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(x + 720, y + 5, 21, 0, 2 * Math.PI);
        ctx.arc(x + 610, y + 5, 21, 0, 2 * Math.PI);
        ctx.fill();
        
        /// windows
        ctx.fillStyle = wcolour;
        ctx.beginPath();
        ctx.moveTo(x + 600, y - 20);
        ctx.lineTo(x + 660, y - 45);
        ctx.lineTo(x + 660, y - 20);
        ctx.moveTo(x + 670, y - 20);
        ctx.lineTo(x + 670, y - 50);
        ctx.lineTo(x + 710, y - 67);
        ctx.lineTo(x + 710, y - 20);
        ctx.fill();

        ///number
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white"
        ctx.font = "56px Arial";
        ctx.fillText(this.number, x + 720, y - 30);
        ctx.strokeText(this.number, x + 720, y - 30);
    
    }
    
}


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let cars = [];

///cars in move
function startRace() {
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw();
        cars[i].move();
    }
    
    requestAnimationFrame(startRace);
}
///static cars
function startR() {
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw();
        
    }
    
    requestAnimationFrame(startR);
}

function random(min, max) {
    return num = Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRaceCar(colours) {
    while (cars.length < 4) {
        b = new RaceCar({
            
            wcolour: "#" + colours[cars.length].hex,
            colour: "#" + colours[cars.length + random(25, 1)].hex,
            xDirection: random(6, 1),
            number: cars.length + 1,
            y: 175 * cars.length + 150,

        });
        cars.push(b);
    }
}


function steady() {
    fetch("https://www.colr.org/json/colors/random/25")
        .then(function (response) {response.json()      
        .then(function (json) {
            createRaceCar(json.colors);
            startR();
            
        });
    });
}

steady();

function initialise() {
    fetch("https://www.colr.org/json/colors/random/25")
        .then(function (response) {response.json()      
        .then(function (json) {
            createRaceCar(json.colors);
            startRace();
            
        });
    });
}
///button function
if (ctx) {document.getElementById("startRace").onclick = initialise;}



