var CanvasSettings = function () {
    this.tileSize = 32;
    this.tiles = {
        w: 27,
        h: 17
    };
    this.size = {
        w: this.tileSize * this.tiles.w,
        h: this.tileSize * this.tiles.h
    };
};

CanvasSettings.prototype.getWidthInPixel = function () {
    return this.size.w;
};

CanvasSettings.prototype.getWidthInTiles = function () {
    return this.tiles.w;
};

CanvasSettings.prototype.getHeightInPixel = function () {
    return this.size.h;
};

CanvasSettings.prototype.getHeightInTiles = function () {
    return this.tiles.h;
};

gCanvas = new CanvasSettings();
