class Basketball extends Phaser.Scene {
    constructor() {
        super("basketballScene");
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('basketball', 'basketball.png');
        this.load.image('football', 'football.png');
        this.load.image('tennis', 'tennis.png');
        this.load.image('soccer', 'soccer.png');
    }

    create() {
        // add basketballs to scene
        let ball01 = this.physics.add.sprite(widthSpacer, halfHeight, 'basketball').setScale(0.5);
        ball01.setDebugBodyColor(0xFFFF00);

        // use setSize to decrease physics body size
        let ball02 = this.physics.add.sprite(widthSpacer*2, halfHeight, 'basketball');
        ball02.body.setSize(20, 40);
        ball02.setDebugBodyColor(0xFFFF00);
        ball02.setAngularVelocity(10);

        // note that scaling the sprite affects the relative position of the physics body
        let ball03 = this.physics.add.sprite(widthSpacer*3, halfHeight, 'basketball').setScale(0.5);
        ball03.body.setSize(100, 50);
        ball03.setDebugBodyColor(0xFFFF00);
        ball03.body.setAngularVelocity(-20);

        let ball04 = this.physics.add.sprite(widthSpacer*4, halfHeight, 'basketball');
        ball04.body.setCircle(ball04.width/2);
        ball04.setDebugBodyColor(0xFFFF00);

        // lastly, add physics body with no texture
        let phantomBall = this.physics.add.sprite(centerX, game.config.height/5);
        phantomBall.body.setCircle(50);
        phantomBall.setDebugBodyColor(0xFACADE);

        // info text
        this.add.text(centerX, game.config.height - 64, 'basketball.png original dimensions 128x128').setOrigin(0.5);
        this.add.text(centerX, game.config.height - 32, 'S for next Scene').setOrigin(0.5);

        // define S key (for Scene switching)
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("bodyBumpsScene");
        });
    }
}