var Tile = function (id, position, material) {
    this.id = id;

    var img =  (material === 'Wall')
        ? gGameEngine.tilesImgs.wall
        : gGameEngine.tilesImgs.wood;

    this.bmp = new createjs.Bitmap(img);

    this.bmp.x = position.x;
    this.bmp.y = position.y;

    gGameEngine.stage.addChild(this.bmp);
    gGameEngine.tiles.push(this);
};

Tile.prototype.remove = function () {
    gGameEngine.stage.removeChild(this.bmp);
};
