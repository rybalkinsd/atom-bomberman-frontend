var Bomb = function (id, position, strength) {
    this.id = id;
    this.strength = strength;

    var size = {
        w: 28,
        h: 28
    };

    var spriteSheet = new createjs.SpriteSheet({
        images: [gGameEngine.bombImg],
        frames: {
            width: size.w,
            height: size.h,
            regX: -1,
            regY: -1
        },
        animations: {
            idle: [0, 4, "idle", 0.2]
        }
    });

    this.bmp = new createjs.Sprite(spriteSheet);
    this.bmp.x = position.x;
    this.bmp.y = position.y;

    this.bmp.gotoAndPlay('idle');
    gGameEngine.stage.addChild(this.bmp);
    gGameEngine.bombs.push(this);
};

Bomb.prototype.remove = function() {
    gGameEngine.stage.removeChild(this.bmp);
};

Bomb.prototype.update = function () {
  // empty implementation
};
