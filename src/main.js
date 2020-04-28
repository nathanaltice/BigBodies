// Nathan Altice
// Updated: 4/28/20
// Bounding Balls
// Some examples illustrating Phaser 3 Arcade Physics bodies and collision detection

// game config
let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Basketball, HoneySpider ],
}

let game = new Phaser.Game(config);

// a few globals
let centerX = game.config.width/2;
let widthSpacer = game.config.width/5;
let halfHeight = game.config.height/2;