class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue,left) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   
        this.points = pointValue;   
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.isLeft=left;
    }

    update() {
        if(this.isLeft){
            this.x -= this.moveSpeed;

            if(this.x <= borderUISize) {
                this.reset();
            }
        }else{
            this.x += this.moveSpeed;
            if(this.x >  game.config.width-borderUISize) {
                this.reset();
            }
        }

    }

    
    reset() {
        if(this.isLeft){
            this.x = game.config.width-borderUISize;
        }else{
            this.x =borderUISize;
        }

    }
}