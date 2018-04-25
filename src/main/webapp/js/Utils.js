var Utils = {};

Utils.getEntityPosition = function (pixels) {
    var position = {};
    position.x = pixels.x;
    position.y = -pixels.y + 16 * 32;
    return position;
};
