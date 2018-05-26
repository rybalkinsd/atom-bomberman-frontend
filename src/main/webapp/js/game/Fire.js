// Вид объекта в реплике
// {"id":5,"type":"Fire","position":{"y":20,"x":10}}
var Fire = function (id, position) {
    this.id = id;
    var size = {
        w: 38,
        h: 38
    };

    var spriteSheet = new createjs.SpriteSheet({
        images: [gGameEngine.asset.fire],
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
    // magic constants to make better fire bang
    this.bmp.x = position.x + 2;
    this.bmp.y = position.y - 5;

    var self = this;
    this.bmp.addEventListener('animationend', function() {
        self.remove();
    });

    gGameEngine.stage.addChild(this.bmp);
    gGameEngine.game.fires.push(this);
};

Fire.prototype.remove = function () {
    gGameEngine.stage.removeChild(this.bmp);
};

Fire.prototype.update = function() {
    // empty implementation
};
