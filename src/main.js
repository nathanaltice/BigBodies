// Nathan Altice
// Updated: 4/26/20
// Bounding Balls
// A simple example illustrating Phaser 3 Arcade Physics Bodies

class Basketball extends Phaser.Scene {
    constructor() {
        super("basketballScene");
    }

    preload() {
        this.load.image('ball', './assets/basketball.png');
    }

    create() {
        // add basketballs to scene
        let ball01 = this.physics.add.sprite(widthSpacer, halfHeight, 'ball').setScale(0.5);
        ball01.setDebugBodyColor(0xFFFF00);

        // use setSize to decrease physics body size
        let ball02 = this.physics.add.sprite(widthSpacer*2, halfHeight, 'ball');
        ball02.body.setSize(20, 40);
        ball02.setDebugBodyColor(0xFFFF00);
        ball02.setAngularVelocity(10);

        // note that scaling the sprite affects the relative position of the physics body
        let ball03 = this.physics.add.sprite(widthSpacer*3, halfHeight, 'ball').setScale(0.5);
        ball03.body.setSize(100, 50);
        ball03.setDebugBodyColor(0xFFFF00);
        ball03.body.setAngularVelocity(-20);

        let ball04 = this.physics.add.sprite(widthSpacer*4, halfHeight, 'ball');
        ball04.body.setCircle(ball04.width/2);
        ball04.setDebugBodyColor(0xFFFF00);

        // lastly, add physics body with no texture
        let phantomBall = this.physics.add.sprite(centerX, 50);
        phantomBall.body.setCircle(20);
        phantomBall.setDebugBodyColor(0xFACADE);

        // info text
        this.add.text(centerX, game.config.height - 32, 'basketball.png original dimensions 128x128').setOrigin(0.5);
    }
}

// game config
let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 300,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Basketball ]
}

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let widthSpacer = game.config.width/5;
let halfHeight = game.config.height/2;