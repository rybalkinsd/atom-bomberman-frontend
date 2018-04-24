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
    this.drawPlatButton();
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
    var gameOverText = new createjs.Text(text, "20px Helvetica", "#ff4444");
    gameOverText.x = 100;
    gameOverText.y = 100;
    this.stage.addChild(gameOverText);
    this.elements.push(gameOverText);
};

Menu.prototype.drawPlatButton = function () {
    var playButtonSize = 110;
    // counting central position for this element
    var playButtonBackgroundX = (gCanvas.getWidthInPixel() - playButtonSize) / 2;
    var playButtonBackgroundY = (gCanvas.getHeightInPixel() - playButtonSize) / 2;

    var playButtonBackgroundGraphics = new createjs.Graphics()
        .beginFill("rgba(0, 0, 0, 0.5)")
        .drawRect(playButtonBackgroundX, playButtonBackgroundY, playButtonSize, playButtonSize);
    var playButtonBackground = new createjs.Shape(playButtonBackgroundGraphics);
    this.stage.addChild(playButtonBackground);
    this.elements.push(playButtonBackground);
    this.setHandCursor(playButtonBackground);

    playButtonBackground.addEventListener('click', function() {
        gGameEngine.startGame()
    });

    var playText = new createjs.Text("Play", "32px Helvetica", "#ff4444");
    // counting central position inside background
    playText.x = playButtonBackgroundX + (playButtonSize - playText.getMeasuredWidth()) / 2;
    var shiftFromDownside = 20;
    playText.y = (playButtonBackgroundY + playButtonSize) - (playText.getMeasuredHeight() + shiftFromDownside);
    this.stage.addChild(playText);
    this.elements.push(playText);

    var singleIcon = new createjs.Bitmap(gGameEngine.pawn);
    var pawnIconSize = 48;
    singleIcon.sourceRect = new createjs.Rectangle(0, 0, pawnIconSize, pawnIconSize);
    singleIcon.x = playButtonBackgroundX + (playButtonSize - pawnIconSize) / 2;
    var shiftFromUpside = 13;
    singleIcon.y = playButtonBackgroundY + shiftFromUpside;
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
