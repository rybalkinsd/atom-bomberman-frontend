var ServerProxy = function () {
    this.handler = {
        'REPLICA': gMessages.handleReplica,
        'POSSESS': gMessages.handlePossess,
        'GAME_OVER': gMessages.handleGameOver
    };
};

ServerProxy.prototype.setupMessaging = function() {
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
    var self = this;
    this.socket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        if (self.handler[msg.topic] === undefined) {
            return;
        }
        self.handler[msg.topic](msg);
    };

    this.socket.onopen = function () { };

    this.socket.onclose = function (event) {
        gGameEngine.unsubscribeAll();
        console.log('Code: ' + event.code + ' cause: ' + event.reason);
    };

    this.socket.onerror = function (error) {
        console.log("Error " + error.message);
    };

    this.setupMessaging();
};
