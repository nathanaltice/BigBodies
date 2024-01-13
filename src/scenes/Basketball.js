class Basketball extends Phaser.Scene {
    constructor() {
        super("basketballScene")
    }

    preload() {
        this.load.path = 'assets/'
        this.load.image('basketball', 'basketball.png')
        this.load.image('football', 'football.png')
        this.load.image('tennis', 'tennis.png')
        this.load.image('soccer', 'soccer.png')
        this.load.image('net', 'net.png')
    }

    create() {
        // basketball scaled with default body (physics bodies scale with the sprite)
        let ball01 = this.physics.add.sprite(widthSpacer, halfHeight, 'basketball').setScale(0.5)
        ball01.setDebugBodyColor(0xFF0000)

        // use setSize to decrease physics body size
        // https://newdocs.phaser.io/docs/3.60.0/Phaser.Physics.Arcade.Body#setSize
        // .setSize(width, height, center)
        let ball02 = this.physics.add.sprite(widthSpacer*2, halfHeight, 'basketball')
        ball02.body.setSize(20, 40)
        ball02.setDebugBodyColor(0xFFFF00)
        ball02.body.setAngularVelocity(10)

        // physics body with offset
        let ball03 = this.physics.add.sprite(widthSpacer*3, halfHeight, 'basketball').setScale(0.5)
        ball03.body.setSize(75, 50, false)
        ball03.body.offset.x = 75
        ball03.body.offset.y = 100 // or .setOffset(75, 200)
        ball03.setDebugBodyColor(0x00BB11)
        ball03.body.setAngularVelocity(-20)

        // circle body
        let ball04 = this.physics.add.sprite(widthSpacer*4, halfHeight, 'basketball')
        ball04.body.setCircle(ball04.width/2)
        ball04.setDebugBodyColor(0xFADBAD)

        // lastly, a physics body with no texture
        let phantomBall = this.physics.add.sprite(centerX, game.config.height/5)
        phantomBall.body.setCircle(50)
        phantomBall.setDebugBodyColor(0xFACADE)

        // info text
        this.add.text(centerX, game.config.height - 64, 'basketball.png original dimensions 128x128').setOrigin(0.5)
        this.add.text(centerX, game.config.height - 32, 'S for next Scene').setOrigin(0.5)

        // define S key (for Scene switching)
        swap = this.input.keyboard.addKey('S')
        swap.on('down', () => {
            this.scene.start("bodyBumpsScene")
        })
    }
}