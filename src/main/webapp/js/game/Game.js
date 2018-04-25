var Game = function (stage) {
    this.stage = stage;

    this.players = [];
    this.tiles = [];
    this.fires = [];
    this.bombs =  [];
    this.bonuses = [];

    this.serverProxy = new ServerProxy();
};

Game.prototype.start = function () {
    gInputEngine.setupBindings();
    var gameId = gMatchMaker.getSessionId();
    this.serverProxy.connectToGameServer(gameId);
    this.drawBackground();

    var self = this;
    createjs.Ticker.addEventListener('tick', function () {
        self.update();
    });
};

Game.prototype.update = function () {
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].update();
    }

    for (var i = 0; i < this.bombs.length; i++) {
        this.bombs[i].update();
    }

    this.stage.update();
};

Game.prototype.finish = function () {
    createjs.Ticker.removeAllEventListeners('tick');
    gInputEngine.unsubscribeAll();
    this.stage.removeAllChildren();

    [this.players, this.fires, this.bombs].forEach(function (it) {
        var i = it.length;
        while (i--) {
            it[i].remove();
            it.splice(i, 1);
        }
    });
};


Game.prototype.drawBackground = function () {
    for (var i = 0; i < gCanvas.tiles.w; i++) {
        for (var j = 0; j < gCanvas.tiles.h; j++) {
            var bitmap = new createjs.Bitmap(gGameEngine.asset.tile.grass);
            bitmap.x = i * gCanvas.tileSize;
            bitmap.y = j * gCanvas.tileSize;
            this.stage.addChild(bitmap);
        }
    }
};

Game.prototype.gc = function (gameObjects) {
    var survivors = new Set();

    for (var i = 0; i < gameObjects.length; i++) {
        var wasDeleted = false;
        var obj = gameObjects[i];

        if (obj.type === 'Pawn' || obj.type === 'Bomb') {
            gMessageBroker.handler[obj.type](obj);
            survivors.add(obj.id);
            continue;
        }

        [this.tiles, this.bonuses].forEach(function (it) {
            var i = it.length;
            while (i--) {
                if (obj.id === it[i].id) {
                    it[i].remove();
                    it.splice(i, 1);
                    wasDeleted = true;
                }
            }
        });

        if (!wasDeleted && obj.type !== 'Pawn') {
            gMessageBroker.handler[obj.type](obj);
        }
    }

    [this.players, this.bombs].forEach(function (it) {
        var i = it.length;
        while (i--) {
            if (!survivors.has(it[i].id)) {
                it[i].remove();
                it.splice(i, 1);
            }
        }
    });
};
