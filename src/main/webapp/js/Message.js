var Message = function () {
    this.handler = {
        'Pawn': this.handlePawn,
        'Bomb': this.handleBomb,
        'Wood': this.handleTile,
        'Wall': this.handleTile,
        'Fire': this.handleFire,
        'Bonus': this.handleBonus
    }
};

Message.prototype.move = function (direction) {
    var template = {
        topic: "MOVE",
        data: {
            direction: direction.toUpperCase()
        }
    };

    return JSON.stringify(template);
};

Message.prototype.plantBomb = function () {
    var template = {
        topic: "PLANT_BOMB",
        data: {}
    };

    return JSON.stringify(template);
};

// Experimental
Message.prototype.jump = function () {
    var template = {
        topic: "JUMP",
        data: {}
    };

    return JSON.stringify(template);
};

Message.prototype.handleReplica = function (msg) {
    var gameObjects = JSON.parse(msg.data);
    gGameEngine.gc(gameObjects);
};

Message.prototype.handleGameOver = function (msg) {
    gGameEngine.gameOver(msg);
    gGameEngine.clearPlayers();
};

Message.prototype.handlePossess = function (msg) {
    gInputEngine.possessed = parseInt(msg.data);
};

Message.prototype.handlePawn = function(obj) {
    var player = gGameEngine.players.find(function (el) {
        return el.id === obj.id;
    });
    var position = Utils.getEntityPosition(obj.position);
    var direction = obj.direction;
    if (player) {
        player.bmp.x = position.x;
        player.bmp.y = position.y;
        player.direction = direction;
    } else {
        player = new Player(obj.id, position);
        gGameEngine.players.push(player);
    }
};

Message.prototype.handleBomb = function(obj) {
    var bomb = gGameEngine.bombs.find(function (el) {
        return el.id === obj.id;
    });
    var position = Utils.getEntityPosition(obj.position);

    if (bomb) {
        bomb.bmp.x = position.x;
        bomb.bmp.y = position.y;
    } else {
        new Bomb(obj.id, position);
    }

};

Message.prototype.handleBonus = function(obj) {
    var bonus = gGameEngine.bonuses.find(function (el) {
        return el.id === obj.id;
    });
    var position = Utils.getEntityPosition(obj.position);

    if (bonus) {
        bonus.bmp.x = position.x;
        bonus.bmp.y = position.y;
    } else {
        new Bonus(obj.id, position, obj.bonusType);
    }
};

Message.prototype.handleTile = function (obj) {
    var tile = gGameEngine.tiles.find(function (el) {
        return el.id === obj.id;
    });
    var position = Utils.getEntityPosition(obj.position);
    if (tile) {
        tile.material = obj.type;
    } else {
        new Tile(obj.id, position, obj.type);
    }
};

Message.prototype.handleFire = function (obj) {
    var fire = gGameEngine.fires.find(function (el) {
        return el.id === obj.id;
    });

    var position = Utils.getEntityPosition(obj.position);
    if (!fire) {
        new Fire(obj.id, position);
    }
};

gMessages = new Message();
