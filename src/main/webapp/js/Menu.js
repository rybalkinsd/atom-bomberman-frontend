/**
 * There are a lot of magic numbers in this file
 * most of them are related to element position on canvas
 * Will be very grateful for merge request with fix of this numbers
 *
 */
var Menu = function (stage) {
    this.stage = stage;
    this.elements = [];
};

Menu.prototype.show = function () {
    this.drawBackground();
    this.drawPlayButton();
};

Menu.prototype.hide = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.stage.removeChild(this.elements[i]);
    }
    this.elements = [];
};

Menu.prototype.showGameOver = function (text) {
    this.show();
    this.showGameOverText(text);
};


Menu.prototype.drawBackground = function () {
    var canvasRect = new createjs.Graphics()
        .beginFill("rgba(0, 0, 0, 0.5)")
        .drawRect(0, 0, gCanvas.getWidthInPixel(), gCanvas.getHeightInPixel());

    var background = new createjs.Shape(canvasRect);
    this.stage.addChild(background);
    this.elements.push(background);
};

Menu.prototype.showGameOverText = function (text) {
    var gameOverText = new createjs.Text(text, "40px Helvetica", "#ff4444");
    gameOverText.x = (gCanvas.getWidthInPixel() - gameOverText.getMeasuredWidth()) / 2;
    var shiftFromUpside = 60;
    gameOverText.y = shiftFromUpside;
    this.stage.addChild(gameOverText);
    this.elements.push(gameOverText);
};

Menu.prototype.drawPlayButton = function () {
    var buttonSize = 110;
    // counting central position for this element
    var buttonX = (gCanvas.getWidthInPixel() - buttonSize) / 2;
    var buttonY = (gCanvas.getHeightInPixel() - buttonSize) / 2;

    this.drawPlayButtonBackground(buttonX, buttonY, buttonSize);
    this.drawPlayButtonText(buttonX, buttonY, buttonSize);
    this.drawPawnIcon(buttonX, buttonY, buttonSize);
};

Menu.prototype.drawPlayButtonBackground = function (x, y, buttonSize) {
    var playButtonBackgroundGraphics = new createjs.Graphics()
        .beginFill("rgba(0, 0, 0, 0.5)")
        .drawRect(x, y, buttonSize, buttonSize);

    var background = new createjs.Shape(playButtonBackgroundGraphics);
    this.stage.addChild(background);
    this.elements.push(background);
    this.setHandCursor(background);

    background.addEventListener('click', function() {
        gGameEngine.startGame()
    });
};

Menu.prototype.drawPlayButtonText = function (x, y, buttonSize) {
    var playText = new createjs.Text("Play", "32px Helvetica", "#ff4444");
    // counting central position inside background
    playText.x = x + (buttonSize - playText.getMeasuredWidth()) / 2;
    var shiftFromDownside = 20;
    playText.y = (y + buttonSize) - (playText.getMeasuredHeight() + shiftFromDownside);
    this.stage.addChild(playText);
    this.elements.push(playText);
};

Menu.prototype.drawPawnIcon = function (x, y, buttonSize) {
    var singleIcon = new createjs.Bitmap(gGameEngine.asset.pawn);
    var pawnIconSize = 48;
    singleIcon.sourceRect = new createjs.Rectangle(0, 0, pawnIconSize, pawnIconSize);
    // counting central position inside background
    singleIcon.x = x + (buttonSize - pawnIconSize) / 2;
    var shiftFromUpside = 13;
    singleIcon.y = y + shiftFromUpside;
    gGameEngine.stage.addChild(singleIcon);
    this.elements.push(singleIcon);
};

Menu.prototype.setHandCursor = function (btn) {
    btn.addEventListener('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    btn.addEventListener('mouseout', function () {
        document.body.style.cursor = 'auto';
    });
};
