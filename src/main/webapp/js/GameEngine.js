var GameEngine = function () {
    this.tilesImgs = {};
    this.bonusesImgs = {};
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
    this.menu.show();
    this.stage.update();
};

GameEngine.prototype.startGame = function () {
    this.menu.hide();
    this.game = new Game(this.stage);
    this.game.start();
};

GameEngine.prototype.finishGame = function (gameOverText) {
    this.game.finish();
    this.game = null;
    this.menu.showGameOver(gameOverText);
    this.stage.update();
};

gGameEngine = new GameEngine();