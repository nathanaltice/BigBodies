class HoneySpider extends Phaser.Scene {
	constructor() {
		super("honeySpiderScene");
	}

	preload() {
		// preload assets
		this.load.image('square', 'assets/img/square.png');

		this.load.path = '../assets/openmoji72x72/';
		this.load.image('p1', '1F577.png');
		this.load.image('web', '1F578.png');
		this.load.image('key', '1F511.png');
		this.load.image('sensor', '1F192.png');
		this.load.image('honey', '1F36F.png');
	}

	create() {
		// variables
		this.key = null; // reserve for later
		this.key_flag = false;
		this.P1_VEL = 300;

		// set bg color
		this.cameras.main.setBackgroundColor("#EEEEEE");

		// add sprites
		this.web = this.physics.add.sprite(game.config.width/10*9, game.config.height/10*9, 'web');
		this.web.body.setImmovable(true);

		this.honey = this.physics.add.sprite(game.config.width/10*9, game.config.height/4, 'honey');

		this.sensor = this.physics.add.sprite(game.config.width/10, game.config.height-game.height/10, 'sensor');
		this.sensor.tint = 0xFFBF00;
		this.sensor.body.setImmovable(true);

		this.p1 = this.physics.add.sprite(game.config.width/10, game.config.height/10, 'p1');
		this.p1.body.setSize(24, 24);
		this.p1.body.setCollideWorldBounds(true);

		this.honey.body.collideWorldBounds = true;
		this.honey.body.bounce.setTo(0.5, 0.5);
		this.honey.body.drag.setTo(this.P1_VEL/4, this.P1_VEL/4);

		// make walls group
		// note that this is a physicsGroup, which will allow us to use the
		// setAll method to set physics properties for all children of the group
		// this.walls = game.add.physicsGroup(Phaser.Physics.ARCADE);
		// make children
		// this.wall = this.walls.create(game.world.centerX, 0, 'square');
		// this.wall.scale.y = game.height/30;
		// this.wall.tint = 0x333333;
		// this.wall = this.walls.create(game.world.centerX, game.height/3*2, 'square');
		// this.wall.scale.y = game.height/30;
		// this.wall.tint = 0x333333;
		// this.wall = this.walls.create(game.world.centerX, game.height/3, 'square');
		// this.wall.scale.y = game.height/30;
		// this.wall.tint = 0xFF0000;

		// this.walls.setAll('body.immovable', true);		
	}

	update() {
		// check collision
		this.physics.arcade.collide(this.p1, this.walls);
		this.physics.arcade.collide(this.p1, this.web);
		this.physics.arcade.collide(this.p1, this.honey);
		this.physics.arcade.collide(this.honey, this.walls);
		this.physics.arcade.collide(this.p1, this.key, this.destroyObject, null, this);
		// check overlaps
		if(!this.key_flag) {
			this.physics.arcade.overlap(this.p1, this.sensor, this.keyTrigger, null, this);
		}

		// move p1
		if(this.input.keyboard.isDown(Phaser.Input.Keyboard.UP)) {
			this.p1.body.velocity.y = -this.P1_VEL;
			this.p1.body.setVelocityX(0);
			this.p1.rotation = Math.PI;
		} else if(this.input.keyboard.isDown(Phaser.Input.Keyboard.DOWN)) {
			this.p1.body.velocity.y = this.P1_VEL;
			this.p1.body.setVelocityX(0);
			this.p1.rotation = 0;
		} else if(this.input.keyboard.isDown(Phaser.Input.Keyboard.LEFT)) {
			this.p1.body.setVelocityX(-this.P1_VEL);
			this.p1.body.velocity.y = 0;
			this.p1.rotation = Math.PI/2;
		} else if(this.input.keyboard.isDown(Phaser.Input.Keyboard.RIGHT)) {
			this.p1.body.setVelocityX(this.P1_VEL);
			this.p1.body.velocity.y = 0;
			this.p1.rotation = Math.PI*3/2;
		} else {
			this.p1.body.setVelocityX(0);
			this.p1.body.velocity.y = 0;
		}
	}

	keyTrigger() {
		// add key to world, give it physics, and set key flag
		this.key = this.physics.add.sprite(game.config.width/10, game.config.height/10, 'key');
		this.key_flag = true;
	}

	destroyObject(player, collided) {
		if(collided.key === 'key') {
			this.wall.kill();
		}
		collided.kill();
	}

}