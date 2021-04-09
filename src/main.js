// Nathan Altice
// Updated: 4/9/21
// Big Bodies
// Some examples illustrating Phaser 3 Arcade Physics bodies and multiple collision detection techniques

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
    scene: [ Basketball, BodyBumps, HoneySpider ],
}

let game = new Phaser.Game(config);

// a few global/reserved variables
let centerX = game.config.width/2;
let widthSpacer = game.config.width/5;
let halfHeight = game.config.height/2;
let swap = null;
let cursors = null;