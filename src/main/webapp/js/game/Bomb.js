// Вид объекта в реплике
// {"id":1,"type":"Bomb","position":{"y":20,"x":10}}
var Bomb = function (id, position, strength) {
    this.id = id;
    this.strength = strength;

    var size = {
        w: 28,
        h: 28
    };

    var spriteSheet = new createjs.SpriteSheet({
        images: [gGameEngine.asset.bomb],
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
    gGameEngine.game.bombs.push(this);
};

Bomb.prototype.remove = function() {
    gGameEngine.stage.removeChild(this.bmp);
};

Bomb.prototype.update = function () {
  // empty implementation
};
