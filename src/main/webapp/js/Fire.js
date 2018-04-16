var Fire = function (id, position) {
    this.id = id;
    var size = {
        w: 38,
        h: 38
    };

    var spriteSheet = new createjs.SpriteSheet({
        images: [gGameEngine.fireImg],
        frames: {
            width: size.w,
            height: size.h,
            regX: 0,
            regY: 0
        },
        animations: {
            idle: [0, 5, null, 0.4]
        }
    });

    this.bmp = new createjs.Sprite(spriteSheet);
    this.bmp.gotoAndPlay('idle');

    var self = this;
    this.bmp.addEventListener('animationend', function() {
        self.remove();
    });

    // magic constants to make better fire bang
    this.bmp.x = position.x + 2;
    this.bmp.y = position.y - 5;

    gGameEngine.stage.addChild(this.bmp);
};

Fire.prototype.remove = function () {
    gGameEngine.stage.removeChild(this.bmp);
};

Fire.prototype.update = function() {
    // empty implementation
};
