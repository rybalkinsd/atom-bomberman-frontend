var Tile = function (id, position, material) {
    this.id = id;

    this.img =  (material === 'Wall')
        ? gGameEngine.tilesImgs.wall
        : gGameEngine.tilesImgs.wood;

    this.bmp = new createjs.Bitmap(this.img);

    this.bmp.x = position.x;
    this.bmp.y = position.y;

    gGameEngine.stage.addChild(this.bmp);
};

Tile.prototype.remove = function () {
    gGameEngine.stage.removeChild(this.bmp);
};

// Tile.prototype.update = function () { };