var GameEngine = function (canvasConfig) {
    this.canvasConfig = canvasConfig;
    this.fps = 60;
    this.players = [];
    this.tiles = [];
    this.bonuses = [];
    this.fires = [];
    this.bombs =  [];

    this.tilesImgs = {};
    this.bonusesImgs = {};

    this.serverProxy = new ServerProxy();
};

GameEngine.prototype.load = function () {
    this.stage = new createjs.Stage("canvas");
    this.stage.canvas.width = gCanvas.getWidthInPixel();
    this.stage.canvas.height = gCanvas.getHeightInPixel();

    this.menu = new Menu(this.stage);
    this.stage.enableMouseOver();

    var queue = new createjs.LoadQueue();
    var self = this;
    queue.addEventListener("complete", function () {
        self.pawn = queue.getResult("pawn");
        self.tilesImgs.grass = queue.getResult("tile_grass");
        self.tilesImgs.wall = queue.getResult("tile_wall");
        self.tilesImgs.wood = queue.getResult("tile_wood");
        self.bombImg = queue.getResult("bomb");
        self.fireImg = queue.getResult("fire");
        self.bonusesImgs.speed = queue.getResult("bonus_speed");
        self.bonusesImgs.bombs = queue.getResult("bonus_bomb");
        self.bonusesImgs.explosion = queue.getResult("bonus_explosion");
        self.initCanvas();
    });
    queue.loadManifest([
        {id: "pawn", src: "img/betty.png"},
        {id: "tile_grass", src: "img/tile_grass.png"},
        {id: "tile_wall", src: "img/tile_wall.png"},
        {id: "tile_wood", src: "img/crateWood.png"},
        {id: "bomb", src: "img/bomb.png"},
        {id: "fire", src: "img/fire.png"},
        {id: "bonus_speed", src: "img/bonus_speed.png"},
        {id: "bonus_bomb", src: "img/bonus_bomb.png"},
        {id: "bonus_explosion", src: "img/bonus_explosion.png"},
    ]);
};

GameEngine.prototype.initCanvas = function () {
    gInputEngine.setupBindings();

    if (!createjs.Ticker.hasEventListener('tick')) {
        var self = this;
        createjs.Ticker.addEventListener('tick', function () {
            self.update();
        });
        createjs.Ticker.setFPS(this.fps);
    }

    this.menu.show();
};

GameEngine.prototype.startGame = function () {
    this.menu.hide();
    this.drawSandTiles();
    var gameId = gMatchMaker.getSessionId();
    this.serverProxy.connectToGameServer(gameId);
};

GameEngine.prototype.drawSandTiles = function () {
    for (var i = 0; i < this.canvasConfig.tiles.w; i++) {
        for (var j = 0; j < this.canvasConfig.tiles.h; j++) {
            var bitmap = new createjs.Bitmap(this.tilesImgs.grass);
            bitmap.x = i * this.canvasConfig.tileSize;
            bitmap.y = j * this.canvasConfig.tileSize;
            this.stage.addChild(bitmap);
        }
    }
};

GameEngine.prototype.update = function () {
    for (var i = 0; i < this.players.length; i++) {
        var player = this.players[i];

        player.update(player.id);
    }

    for (var i = 0; i < this.bombs.length; i++) {
        var bomb = this.bombs[i];
        bomb.update();
    }

    this.stage.update();
};

GameEngine.prototype.gameOver = function (gameOverText) {
    gInputEngine.subscribers = [];
    this.clearPlayers();
    this.cleanCanvas();
    this.menu.showGameOver(gameOverText);
};

GameEngine.prototype.cleanCanvas = function () {
    this.bombs = [];
    this.tiles = [];
    this.bonuses = [];
    this.fires = [];

    this.stage.removeAllChildren();
};


GameEngine.prototype.clearPlayers = function () {
    [this.players, this.fires, this.bombs].forEach(function (it) {
        var i = it.length;
        while (i--) {
            it[i].remove();
            it.splice(i, 1);
        }
    });
};

GameEngine.prototype.gc = function (gameObjects) {
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

gGameEngine = new GameEngine(gCanvas);