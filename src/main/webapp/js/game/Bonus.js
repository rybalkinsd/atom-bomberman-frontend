// Вид объекта в реплике
// {"id":2,"type":"Bonus","position":{"y":20,"x":10},"bonusType":"BOMBS"}
// {"id":3,"type":"Bonus","position":{"y":20,"x":10},"bonusType":"SPEED"}
// {"id":4,"type":"Bonus","position":{"y":20,"x":10},"bonusType":"RANGE"}
var Bonus = function (id, position, type) {
    this.id = id;

    var img;
    if (type === 'SPEED') {
        img = gGameEngine.asset.bonus.speed;
    } else if (type === 'BOMBS') {
        img = gGameEngine.asset.bonus.bombs;
    } else if (type === 'RANGE') {
        img = gGameEngine.asset.bonus.explosion;
    }

    this.bmp = new createjs.Bitmap(img);
    this.bmp.regX = -1;
    this.bmp.regY = -1;
    this.bmp.x = position.x;
    this.bmp.y = position.y;

    gGameEngine.stage.addChild(this.bmp);
    gGameEngine.game.bonuses.push(this);
};

Bonus.prototype.remove = function() {
    gGameEngine.stage.removeChild(this.bmp);
};

Bonus.prototype.update = function() {
    // empty implementation
};
