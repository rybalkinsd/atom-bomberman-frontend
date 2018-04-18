var ClusterSetting = function () {
    this.gameServer = {
        protocol: 'ws',
        host: 'localhost',
        port: '8080',
        path: '/events/connect'
    };

    this.matchMaker = {
        protocol: 'http',
        host: 'localhost',
        port: '8090',
        path: '/matchmaker/join'
    };
};

ClusterSetting.prototype.makeGameServerUrl = function() {
    return makeUrl(this.gameServer)
};

ClusterSetting.prototype.makeMatchMakerUrl = function() {
    return makeUrl(this.matchMaker)
};

function makeUrl(data) {
    return data['protocol'] + "://" + data['host'] + ":" + data['port'] + data['path']
}

var gClusterSettings = new ClusterSetting();
