class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

        this.load.image('rocket', './assets/rocket.png');
        this.load.image('coke', './assets/coke.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceshipX', './assets/spaceshipx.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('title', './assets/title.png');
        this.load.image('moon', './assets/moon.jpg');
        this.load.image('title', './assets/title.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
    }

    fastFly() {
        this.ship01.moveSpeed=this.ship01.moveSpeed*1.5
        this.ship02.moveSpeed=this.ship02.moveSpeed*1.5
        this.ship03.moveSpeed=this.ship03.moveSpeed*1.5
        this.ship04.moveSpeed=this.ship04.moveSpeed*1.5
    }

    create() {


        if (this.data.get('maxScore') > 0) {

        } else {
            this.data.set('maxScore', 0);
        }

        this.time.delayedCall(30000, this.fastFly, [], this);

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0).setScrollFactor(0);
        for (let i = 0; i < 30; i++) {
            this.add.circle(16 + i * 26, 16, 16, 0xFFC0CB).setScrollFactor(0);
        }
        let point=24;
        for (let i = 0; i < 9; i++) {
            let color = i % 2 == 0 ? 0xFFC0CB : 0x8FBC8F;
            this.add.star(16, 50+i*(borderUISize*1.5), point, borderUISize/4, borderUISize, color).setScrollFactor(0);
            this.add.star(game.config.width - borderUISize,50+i*(borderUISize*1.5), point, borderUISize/4, borderUISize, color).setScrollFactor(0);
            this.add.star(borderUISize*2+i*(borderUISize*2), game.config.height-borderUISize, point, borderUISize/4, borderUISize, color).setScrollFactor(0);
        }

        //this.createAligned(this, game.config.width, 'moon', 0.25)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0.5).setScrollFactor(0);


        let x1Left =  Math.random() * 10>5 ? true : false;
        let x1 = x1Left ? game.config.width : 0;
        let x2Left =  Math.random() * 10>5 ? true : false;
        let x2 = x2Left ? game.config.width : 0;
        let x3Left =  Math.random() * 10>5 ? true : false;
        let x3 = x3Left ? game.config.width : 0;
        let x4Left =  Math.random() * 10>5 ? true : false;
        let x4 = x4Left ? game.config.width : 0;

        this.ship01 = new Spaceship(this, x1, borderUISize * 4, 'spaceship', 0, 30, x1Left).setOrigin(0, 0).setScrollFactor(0);
        this.ship02 = new Spaceship(this, x2 + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20, x2Left).setOrigin(0, 0).setScrollFactor(0);
        this.ship03 = new Spaceship(this, x3, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10,x4Left).setOrigin(0, 0).setScrollFactor(0);
        this.ship04 = new Spaceship(this, x4, borderUISize * 7 + borderPadding * 6, 'spaceshipX', 0, 40,x4Left).setOrigin(0, 0).setScale(0.5,0.5).setScrollFactor(0);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });


        this.p1Score = 0;
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callbackScope: this,
            repeat: game.settings.gameTimer / 1000
        });


        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let maxScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f33d35',
            color: '#42841b',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let leftConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#35cdf3',
            color: '#031a5f',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 1, this.p1Score, scoreConfig).setScrollFactor(0);
        this.maxScore = this.add.text(borderUISize + borderPadding + 250, borderUISize + borderPadding * 1, this.data.get('maxScore'), maxScoreConfig).setScrollFactor(0);
        this.leftTime = this.add.text(borderUISize + borderPadding + 350, borderUISize + borderPadding * 1, this.data.get('maxScore'), leftConfig).setScrollFactor(0);
        this.add.star(borderUISize*2,borderUISize*2, 5, 8, 16, 0x00008B);
        this.add.star(borderUISize*5,borderUISize*5, 5, 8, 16, 0x00008B);
        this.add.star(borderUISize*9,borderUISize*9, 5, 8, 16, 0x00008B);
        this.input.on('pointerdown', function (pointer) {
            this.p1Rocket.x = pointer.x;
            this.p1Rocket.isFiring = true;
        }, this);

        this.gameOver = false;


        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() {
        this.leftTime.text = this.timedEvent.repeatCount;
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }


        this.cameras.main.scrollX += 0.1
        if(this.cameras.main.scrollX>game.config.width){
            this.cameras.main.scrollX=0;
        }
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {

        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        if (this.p1Score > this.data.get('maxScore')) {
            this.data.set('maxScore', this.p1Score);
        }
        this.maxScore.text = this.data.get('maxScore');
        this.sound.play('sfx_explosion');
    }

    createAligned  (scene, totalWidth, texture, scrollFactor) {
        const w = scene.textures.get(texture).getSourceImage().width
        const count = Math.ceil(totalWidth / w) * scrollFactor

        let x = 0
        for (let i = 0; i < count; ++i)
        {
            const m = scene.add.image(x, scene.scale.height, texture)
                .setOrigin(0, 1)
                .setScrollFactor(scrollFactor)
            x += m.width
        }
    }
}