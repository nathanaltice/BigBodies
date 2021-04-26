class BodyBumps extends Phaser.Scene {
    constructor() {
        super('bodyBumpsScene');
    }

    create() {
        // velocity constant
        this.BALL_VELOCITY = 300;

        this.basketball = this.physics.add.sprite(widthSpacer, halfHeight, 'basketball').setScale(0.5);
        this.basketball.setDebugBodyColor(0xFFFF00);
        this.basketball.setCollideWorldBounds(true);
        this.basketball.setBounce(1);

        this.football = this.physics.add.sprite(widthSpacer*2, halfHeight, 'football');
        this.football.body.setSize(20, 40);
        this.football.setDebugBodyColor(0x00FF00);
        this.football.setAngularVelocity(10);

        this.tennis = this.physics.add.sprite(widthSpacer*3, halfHeight, 'tennis').setScale(0.5);
        this.tennis.body.setCircle(50);
        this.tennis.setDebugBodyColor(0xFACADE);
        this.tennis.body.setAngularVelocity(-20);
        this.tennis.body.setImmovable(true);
        this.tennis.body.onCollide = true; // must be set for collision event to work

        this.soccer = this.physics.add.sprite(widthSpacer*4, halfHeight, 'soccer');
        this.soccer.body.setCircle(this.soccer.width/2);
        this.soccer.body.onCollide = true;      // must be set for collision event to work
        this.soccer.body.onWorldBounds = true;  // ditto for worldbounds
        this.soccer.body.onOverlap = true;      // ditto for overlap
        this.soccer.setDebugBodyColor(0xFFFF00);
        this.soccer.setCollideWorldBounds(true);

        // info text
        this.message = this.add.text(centerX, 32, 'Awaiting physics world events...').setOrigin(0.5);
        this.add.text(centerX, game.config.height - 64, 'Use cursor keys to move soccer ball').setOrigin(0.5);
        this.add.text(centerX, game.config.height - 32, 'S for next Scene').setOrigin(0.5);

        // create physics world events
        // note: you MUST use a .collide/.overlap check in update() AND set body.onCollide/body.onOverlap/.onWorldBounds to true for these to work
        this.physics.world.on('collide', (obj1, obj2, body1, body2)=>{
            this.message.text = `${obj1.texture.key} is colliding with ${obj2.texture.key} body`;
        });

        this.physics.world.on('overlap', (obj1, obj2, body1, body2)=>{
            this.message.text = `${obj1.texture.key} body is overlapping ${obj2.texture.key} body`;
        });

        this.physics.world.on('worldbounds', (body)=>{
            this.message.text = `${body.gameObject.texture.key} touched world bounds`;
        });

        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("honeySpiderScene");
        });
    }

    update() {
        // check collisions
        this.physics.collide(this.soccer, this.basketball);
        this.physics.collide(this.soccer, this.tennis);
        this.physics.collide(this.basketball, this.tennis);
        // check overlaps
        this.physics.overlap(this.soccer, this.football);   // note that this won't trip the world overlap signal
        this.physics.overlap(this.basketball, this.football); 

        // player input
        if(cursors.left.isDown) {
            this.soccer.body.setVelocityX(-this.BALL_VELOCITY);
        } else if(cursors.right.isDown) {
            this.soccer.body.setVelocityX(this.BALL_VELOCITY);
        } else {
            this.soccer.body.setVelocityX(0);
        }
        
        if(cursors.up.isDown) {
            this.soccer.body.setVelocityY(-this.BALL_VELOCITY);
        } else if(cursors.down.isDown) {
            this.soccer.body.setVelocityY(this.BALL_VELOCITY);
        } else {
            this.soccer.body.setVelocityY(0);
        }
    }
}