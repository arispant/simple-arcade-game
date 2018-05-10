// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x > 510) {
    this.x = -50;
    this.speed = 100 + Math.floor((Math.random() * 350) + 200);
    }

    if(player.x >= this.x - 75 && player.x <= this.x + 75){
        if(player.y >= this.y - 75 && player.y <= this.y + 75){
            player.reInitializePlayer();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.playerImg = 'images/char-boy.png';
        this.score = 0;
    }

    update(){

    }

    render(){
        ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
    }

    reInitializePlayer(){
        this.x = 202;
        this.y = 402;
    }

    updateScore(){
        this.score += 1;
        document.getElementById("score").innerHTML = this.score;
    }

    handleInput(evt){
        if (evt == 'left' && this.x > 0) {
            this.x -= 102;
        } else if (evt == 'right' && this.x < 402) {
            this.x += 102;
        } else if (evt == 'up' && this.y > 0) {
            this.y -= 83;
            if (this.y === -13) {
              setTimeout(this.reInitializePlayer.bind(this), 800);
              this.updateScore();
            }
        } else if (evt == 'down' && this.y < 402) {
            this.y += 83;
        }
    }
  }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(-50, 63, 50);
let enemy2 = new Enemy(-50, 147, Math.floor((Math.random() * 350) + 200));
let enemy3 = new Enemy(-50, 230, Math.floor((Math.random() * 350) + 200));

let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(202, 402);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let scores = document.getElementById("score");
scores.innerHTML = player.score;
