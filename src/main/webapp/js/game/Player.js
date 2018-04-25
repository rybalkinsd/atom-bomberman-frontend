var Player = function (id, position) {
    this.id = id;
    this.alive = true;

    var size = {
        w: 48,
        h: 48
    };

    var spriteSheet = new createjs.SpriteSheet({
        images: [gGameEngine.pawn],
        frames: {
            width: size.w,
            height: size.h,
            regX: 10,
            regY: 12
        },
        animations: {
            idle: [0, 0, 'idle'],
            down: [0, 3, 'down', 0.1],
            left: [4, 7, 'left', 0.1],
            up: [8, 11, 'up', 0.1],
            right: [12, 15, 'right', 0.1],
            dead: [16, 16, 'dead', 0.1]
        }
    });

    this.bmp = new createjs.Sprite(spriteSheet);
    this.bmp.x = position.x;
    this.bmp.y = position.y;

    gGameEngine.stage.addChild(this.bmp);
};

Player.prototype.remove = function () {
    gGameEngine.stage.removeChild(this.bmp);
};

Player.prototype.animate = function (animation) {
    if (!this.bmp.currentAnimation || this.bmp.currentAnimation.indexOf(animation) === -1) {
        this.bmp.gotoAndPlay(animation);
    }
};

Player.prototype.update = function () {
    if (!this.alive) {
        return;
    }

    if (this.direction === "UP") {
        this.animate('up');
    } else if (this.direction === "DOWN") {
        this.animate('down');
    } else if (this.direction === "LEFT") {
        this.animate('left');
    } else if (this.direction === "RIGHT") {
        this.animate('right');
    } else {
        this.animate('idle');
    }
};
