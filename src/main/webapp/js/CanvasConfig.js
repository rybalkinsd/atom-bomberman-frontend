var CanvasConfig = function () {
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

CanvasConfig.prototype.getWidthInPixel = function () {
    return this.size.w;
};

CanvasConfig.prototype.getWidthInTiles = function () {
    return this.tiles.w;
};

CanvasConfig.prototype.getHeightInPixel = function () {
    return this.size.h;
};

CanvasConfig.prototype.getHeightInTiles = function () {
    return this.tiles.h;
};

gCanvas = new CanvasConfig();
