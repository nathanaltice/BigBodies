class Collider extends Phaser.Scene {
    constructor() {
        super({ key: 'colliderScene' })
    }

    init() {
        this.BALL_VELOCITY = 300
    }

    create() {
        // create soccer ball
        this.soccer = this.physics.add.sprite(centerX, halfHeight, 'soccer')
        this.soccer.body.setCircle(this.soccer.width/2)
        this.soccer.setDebugBodyColor(0xFFFF00)
        this.soccer.setCollideWorldBounds(true)
        this.soccer.setDepth(10)               // keep soccer ball on top

        this.platform = this.physics.add.sprite(centerX, halfHeight - widthSpacer, 'square')
        this.platform.setScale(30, 2)
        this.platform.setImmovable(true)

        this.physics.add.collider(this.soccer, this.platform, null, this.collisionProcessCallback, this)

        cursors = this.input.keyboard.createCursorKeys()
        swap = this.input.keyboard.addKey('S')
        swap.on('down', () => {
            this.scene.start("basketballScene")
        })

        this.add.text(centerX, game.config.height - 64, 'ball can only pass through platform from bottom').setOrigin(0.5)
        this.add.text(centerX, game.config.height - 32, 'S for next Scene').setOrigin(0.5)
    }

    update() {
        // player input
        this.direction = new Phaser.Math.Vector2(0)
        if(cursors.left.isDown) {
            this.direction.x = -1
        } else if(cursors.right.isDown) {
            this.direction.x = 1
        }  
        if(cursors.up.isDown) {
            this.direction.y = -1
        } else if(cursors.down.isDown) {
            this.direction.y = 1
        }
        this.direction.normalize()
        this.soccer.setVelocityX(this.direction.x * this.BALL_VELOCITY)
        this.soccer.setVelocityY(this.direction.y * this.BALL_VELOCITY)

    }

    collisionProcessCallback(obj1, obj2) {
        // if soccer ball is moving up, no collision
        if(this.direction.y == -1) {
            return false
        }
    }
}