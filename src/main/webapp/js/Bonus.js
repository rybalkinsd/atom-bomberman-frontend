var Bonus = function (id, position, type) {
    this.id = id;

    var img;
    if (type === 'SPEED') {
        img = gGameEngine.bonusesImgs.speed;
    } else if (type === 'BOMBS') {
        img = gGameEngine.bonusesImgs.bombs;
    } else if (type === 'RANGE') {
        img = gGameEngine.bonusesImgs.explosion;
    }

    this.bmp = new createjs.Bitmap(img);
    this.bmp.regX = -1;
    this.bmp.regY = -1;
    this.bmp.x = position.x;
    this.bmp.y = position.y;

    gGameEngine.stage.addChild(this.bmp);
    gGameEngine.bonuses.push(this);
};

Bonus.prototype.remove = function() {
    gGameEngine.stage.removeChild(this.bmp);
};

Bonus.prototype.update = function() {
    // empty implementation
};
