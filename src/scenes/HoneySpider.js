class HoneySpider extends Phaser.Scene {
	constructor() {
		super("honeySpiderScene")
	}

	init() {
		this.key = null 		// reserve for later
		this.key_flag = false
		this.P1_VEL = 300
	}

	preload() {
		// preload assets
		this.load.path = 'assets/'
		this.load.image('square', 'square.png')
		this.load.image('p1', 'spider.png')
		this.load.image('web', 'web.png')
		this.load.image('goldKey', 'key.png')
		this.load.image('sensor', 'cool.png')
		this.load.image('honey', 'honey.png')
	}

	create() {
		// set bg color
		this.cameras.main.setBackgroundColor("#EEEEEE")

		// add physics sprites
		// 🕸
		this.web = this.physics.add.sprite(game.config.width/10*9, game.config.height/10*9, 'web')
		this.web.body.setImmovable(true)
		this.web.body.setSize(24, 24)
		
		// 🍯
		this.honey = this.physics.add.sprite(game.config.width/10*9, game.config.height/4, 'honey')
		this.honey.body.collideWorldBounds = true
		this.honey.body.setSize(40, 40)
		this.honey.body.setBounce(0.8)

		// 🆒
		this.sensor = this.physics.add.sprite(game.config.width/10, game.config.height-game.config.height/10, 'sensor')
		this.sensor.tint = 0xFFBF00
		this.sensor.body.setImmovable(true)
		this.sensor.body.setSize(24, 24)
		
		// 🕷
		this.p1 = this.physics.add.sprite(game.config.width/10, game.config.height/10, 'p1')
		this.p1.body.setSize(24, 24)
		this.p1.body.setCollideWorldBounds(true)

		// add walls group
		// https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html#.PhysicsGroupConfig__anchor
		this.walls = this.physics.add.group({
			immovable: true
		})
		
		// create children 🍼 inside walls group
		this.wallTop = this.walls.create(centerX, 0, 'square').setOrigin(0)
		this.wallTop.scaleY = game.config.height / 30	// make it taaaaaaaall
		this.wallTop.scaleX = 4
		this.wallTop.tint = 0x333333

		this.wallBtm = this.walls.create(centerX, game.config.height / 3 * 2, 'square').setOrigin(0)
		this.wallBtm.scaleY = game.config.height / 30
		this.wallBtm.scaleX = 4
		this.wallBtm.tint = 0x333333
		
		this.door = this.walls.create(centerX, game.config.height / 3, 'square').setOrigin(0)
		this.door.scaleY = game.config.height / 30
		this.door.scaleX = 4
		this.door.tint = 0xFFBF00
	
		// define cursors and S key (for Scene switching)
		cursors = this.input.keyboard.createCursorKeys()
		swap = this.input.keyboard.addKey('S')
		swap.on('down', () => {
			this.scene.start("colliderScene")
		})
	}

	update() {
		// check collision
		this.physics.collide(this.p1, this.walls)
		this.physics.collide(this.p1, this.web)
		this.physics.collide(this.p1, this.honey)
		this.physics.collide(this.honey, this.walls)
		
		//check overlaps
		if(!this.key_flag) {
			this.physics.overlap(this.p1, this.sensor, this.keyTrigger, null, this)
		} else {
			this.physics.collide(this.p1, this.goldKey, (player, collided) => {
				this.door.destroy()
				collided.destroy()
			}, null, this)
		}

		// move p1
		if(cursors.up.isDown) {
			this.p1.body.setVelocityY(-this.P1_VEL)
			this.p1.body.setVelocityX(0)
			this.p1.rotation = Math.PI
		} else if(cursors.down.isDown) {
			this.p1.body.setVelocityY(this.P1_VEL)
			this.p1.body.setVelocityX(0)
			this.p1.rotation = 0
		} else if(cursors.left.isDown) {
			this.p1.body.setVelocityX(-this.P1_VEL)
			this.p1.body.setVelocityY(0)
			this.p1.rotation = Math.PI/2
		} else if(cursors.right.isDown) {
			this.p1.body.setVelocityX(this.P1_VEL)
			this.p1.body.setVelocityY(0)
			this.p1.rotation = Math.PI*3/2
		} else {
			this.p1.body.setVelocityX(0)
			this.p1.body.setVelocityY(0)
		}
	}

	keyTrigger() {
		// add key to world, set key flag, and untint 🆒 sensor
		this.goldKey = this.physics.add.sprite(100, 100, 'goldKey')
		this.goldKey.body.setSize(24, 24)
		this.goldKey.setAngle(45)
		this.key_flag = true
		this.sensor.setTint()
	}
}