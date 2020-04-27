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

        // use setSize to decrease physics body size
        let ball02 = this.physics.add.sprite(widthSpacer*2, halfHeight, 'ball');
        ball02.body.setSize(20, 40);

        let ball03 = this.physics.add.sprite(widthSpacer*3, halfHeight, 'ball').setScale(0.5);
        ball03.body.setSize(100, 50);

        let ball04 = this.physics.add.sprite(widthSpacer*4, halfHeight, 'ball');
        ball04.body.setCircle(ball04.width/2);

        this.add.text(centerX, game.config.height - 32, 'basketball.png original dimensions 128x128').setOrigin(0.5);
    }
}

// game config
let config = {
    type: Phaser.AUTO,
    width: 600,
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