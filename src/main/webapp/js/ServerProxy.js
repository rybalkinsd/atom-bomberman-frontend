var ServerProxy = function () {
    this.handler = {
        'REPLICA': gMessages.handleReplica,
        'POSSESS': gMessages.handlePossess,
        'GAME_OVER': gMessages.handleGameOver
    };
};

ServerProxy.prototype.getSessionIdFromMatchMaker = function () {
    var name = "name=" + Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

    if(!name) {
        alert("Please input login");
    }

    var settings = {
        "method": "POST",
        "crossDomain": true,
        "url": gClusterSettings.matchMakerUrl(),
        "data": name
    };

    var self = this;
    $.ajax(settings).done(function(data) {
        self.gameId = data;
        self.connectToGameServer(self.gameId);
    }).fail(function() {
        alert("Matchmaker request failed");
    });
};

ServerProxy.prototype.subscribeEvents = function() {
    var self = this;
    gInputEngine.subscribe('up', function () {
        self.socket.send(gMessages.move('up'))
    });
    gInputEngine.subscribe('down', function () {
        self.socket.send(gMessages.move('down'))
    });
    gInputEngine.subscribe('left', function () {
        self.socket.send(gMessages.move('left'))
    });
    gInputEngine.subscribe('right', function () {
        self.socket.send(gMessages.move('right'))
    });
    gInputEngine.subscribe('bomb', function () {
        self.socket.send(gMessages.plantBomb());
    });
    gInputEngine.subscribe('jump', function () {
        self.socket.send(gMessages.jump());
    });
};

ServerProxy.prototype.connectToGameServer = function(gameId) {
    this.socket = new WebSocket(gClusterSettings.gameServerUrl() + "?gameId=" + gameId + "&name=NKOHA");
    gGameEngine.menu.hide();

    gGameEngine.playing = true;
    gGameEngine.restart();

    this.subscribeEvents();

    this.socket.onopen = function () {
    };

    this.socket.onclose = function (event) {
        if (event.wasClean) {
            console.log('closed');
        } else {
            console.log('alert close');
        }
        console.log('Code: ' + event.code + ' cause: ' + event.reason);
    };

    var self = this;
    this.socket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        if (self.handler[msg.topic] === undefined)
            return;

        self.handler[msg.topic](msg);
    };

    this.socket.onerror = function (error) {
        console.log("Error " + error.message);
    };
};
