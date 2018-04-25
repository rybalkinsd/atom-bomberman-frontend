var Game = function (canvasConfig) {
    this.canvasConfig = canvasConfig;
    // this.stage = ???
    this.players = [];
    this.fires = [];
    this.bombs =  [];
    this.bonuses = [];

    this.fps = 60;
    this.tiles = [];
    this.tilesImgs = {};
    this.bonusesImgs = {};

    this.serverProxy = new ServerProxy();
};

Game.prototype.start = function () {
    var gameId = gMatchMaker.getSessionId();
    this.serverProxy.connectToGameServer(gameId);
    this.drawSandTiles();

    if (!createjs.Ticker.hasEventListener('tick')) {
        var self = this;
        createjs.Ticker.addEventListener('tick', function () {
            self.update();
        });
        createjs.Ticker.setFPS(this.fps);
    }
};

Game.prototype.update = function () {
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].update(player.id);
    }

    for (var i = 0; i < this.bombs.length; i++) {
        this.bombs[i].update();
    }

    this.stage.update();
};

Game.prototype.finish = function () {
    this.stage.removeAllChildren();

    // ???
    // [this.players, this.fires, this.bombs].forEach(function (it) {
    //     var i = it.length;
    //     while (i--) {
    //         it[i].remove();
    //         it.splice(i, 1);
    //     }
    // });
};


Game.prototype.drawSandTiles = function () {
    for (var i = 0; i < this.canvasConfig.tiles.w; i++) {
        for (var j = 0; j < this.canvasConfig.tiles.h; j++) {
            var bitmap = new createjs.Bitmap(this.tilesImgs.grass);
            bitmap.x = i * this.canvasConfig.tileSize;
            bitmap.y = j * this.canvasConfig.tileSize;
            this.stage.addChild(bitmap);
        }
    }
};

