// Вид объекта в реплике
// {"id":6,"type":"Wall","position":{"y":20,"x":10}}
// {"id":7,"type":"Wood","position":{"y":20,"x":10}}
var Tile = function (id, position, material) {
    this.id = id;

    var img = (material === 'Wall')
        ? gGameEngine.asset.tile.wall
        : gGameEngine.asset.tile.wood;

    this.bmp = new createjs.Bitmap(img);
    this.bmp.x = position.x;
    this.bmp.y = position.y;

    gGameEngine.stage.addChild(this.bmp);
    gGameEngine.game.tiles.push(this);
};

Tile.prototype.remove = function () {
    gGameEngine.stage.removeChild(this.bmp);
};
