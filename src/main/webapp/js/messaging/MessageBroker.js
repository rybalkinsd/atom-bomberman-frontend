var MessageBroker = function () {
    this.handler = {
        'Pawn': this.handlePawn,
        'Bomb': this.handleBomb,
        'Wood': this.handleTile,
        'Wall': this.handleTile,
        'Fire': this.handleFire,
        'Bonus': this.handleBonus
    }
};

MessageBroker.prototype.handleReplica = function (msg) {
    var gameObjects = JSON.parse(msg.data);
    gGameEngine.game.gc(gameObjects);
};

MessageBroker.prototype.handleGameOver = function (msg) {
    gGameEngine.finishGame(msg.data);
};

MessageBroker.prototype.handlePossess = function (msg) {
    gInputEngine.possessed = parseInt(msg.data);
};

MessageBroker.prototype.handlePawn = function(obj) {
    var player = gGameEngine.game.players.find(function (el) {
        return el.id === obj.id;
    });
    var position = gMessageBroker.mirrorPosition(obj.position);
    var direction = obj.direction;
    if (player) {
        player.bmp.x = position.x;
        player.bmp.y = position.y;
        player.direction = direction;
    } else {
        player = new Player(obj.id, position);
        gGameEngine.game.players.push(player);
    }
};

MessageBroker.prototype.handleBomb = function(obj) {
    var bomb = gGameEngine.game.bombs.find(function (el) {
        return el.id === obj.id;
    });
    var position = gMessageBroker.mirrorPosition(obj.position);

    if (bomb) {
        bomb.bmp.x = position.x;
        bomb.bmp.y = position.y;
    } else {
        new Bomb(obj.id, position);
    }
};

MessageBroker.prototype.handleBonus = function(obj) {
    var bonus = gGameEngine.game.bonuses.find(function (el) {
        return el.id === obj.id;
    });
    var position = gMessageBroker.mirrorPosition(obj.position);

    if (bonus) {
        bonus.bmp.x = position.x;
        bonus.bmp.y = position.y;
    } else {
        new Bonus(obj.id, position, obj.bonusType);
    }
};

MessageBroker.prototype.handleTile = function (obj) {
    var tile = gGameEngine.game.tiles.find(function (el) {
        return el.id === obj.id;
    });
    var position = gMessageBroker.mirrorPosition(obj.position);
    if (tile) {
        tile.material = obj.type;
    } else {
        new Tile(obj.id, position, obj.type);
    }
};

MessageBroker.prototype.handleFire = function (obj) {
    var fire = gGameEngine.game.fires.find(function (el) {
        return el.id === obj.id;
    });

    var position = gMessageBroker.mirrorPosition(obj.position);
    if (!fire) {
        new Fire(obj.id, position);
    }
};

MessageBroker.prototype.mirrorPosition = function (origin) {
    return {
        x: origin.x,
        y: -origin.y + gCanvas.getHeightInPixel() - gCanvas.tileSize
    }
};

MessageBroker.prototype.move = function (direction) {
    var template = {
        topic: "MOVE",
        data: {
            direction: direction.toUpperCase()
        }
    };

    return JSON.stringify(template);
};

MessageBroker.prototype.plantBomb = function () {
    var template = {
        topic: "PLANT_BOMB",
        data: {}
    };

    return JSON.stringify(template);
};

// Experimental
MessageBroker.prototype.jump = function () {
    var template = {
        topic: "JUMP",
        data: {}
    };

    return JSON.stringify(template);
};

gMessageBroker = new MessageBroker();
