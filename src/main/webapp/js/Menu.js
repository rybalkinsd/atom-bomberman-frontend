/**
 * There are a lot of magic numbers in this file
 * most of them are related to element position on canvas
 * Will be very grateful for merge request with fix of this numbers
 *
 */
var Menu = function () {
    this.visible = true;
    this.elements = [];
};

Menu.prototype.show = function () {
    this.visible = true;
    this.draw();
};

Menu.prototype.hide = function () {
    this.visible = false;

    for (var i = 0; i < this.elements.length; i++) {
        gGameEngine.stage.removeChild(this.elements[i]);
    }
    this.elements = [];
};

Menu.prototype.showWithText = function (text, color) {
    this.visible = true;
    this.draw(text, color);
};

Menu.prototype.draw = function (text, color) {
    this.drawBackground();
    this.drawStartButton();
    if (text !== null) {
        this.drawText(text, color);
    }
};

Menu.prototype.update = function () {
    if (!this.elements) {
        return;
    }

    for (var i = 0; i < this.elements.length; i++) {
        gGameEngine.moveToFront(this.elements[i]);
    }
};

Menu.prototype.drawBackground = function () {
    var canvasRect = new createjs.Graphics()
        .beginFill("rgba(0, 0, 0, 0.5)")
        .drawRect(0, 0, gGameEngine.size.w, gGameEngine.size.h);

    var background = new createjs.Shape(canvasRect);
    gGameEngine.stage.addChild(background);
    this.elements.push(background);
};

Menu.prototype.drawText = function (text, color) {
    var startButtonX = gGameEngine.size.w / 2 - 55;
    var startButtonY = gGameEngine.size.h / 2 - 80;

    var gameText = new createjs.Text(text, "20px Helvetica", color);
    if (text === "GAME OVER :(") {
        gameText.x = startButtonX - 40;
    }
    else {
        gameText.x = startButtonX - 30;
    }
    gameText.y =  startButtonY.y - 90;
    gGameEngine.stage.addChild(gameText);
    this.elements.push(gameText);
};

Menu.prototype.drawStartButton = function () {
    var startButtonX = gGameEngine.size.w / 2 - 55;
    var startButtonY = gGameEngine.size.h / 2 - 80;
    var startButtonSize = 110;

    var singleBgGraphics = new createjs.Graphics()
        .beginFill("rgba(0, 0, 0, 0.5)")
        .drawRect(startButtonX, startButtonY, startButtonSize, startButtonSize);
    var singleBg = new createjs.Shape(singleBgGraphics);
    gGameEngine.stage.addChild(singleBg);
    this.elements.push(singleBg);
    this.setHandCursor(singleBg);

    singleBg.addEventListener('click', function () {
        gGameEngine.serverProxy.getSessionIdFromMatchMaker();
    });

    var playButton = new createjs.Text("Play", "32px Helvetica", "#ff4444");
    var singleTitleWidth = playButton.getMeasuredWidth();
    var modeTitlesY = startButtonY + startButtonSize - playButton.getMeasuredHeight() - 20;

    playButton.x = startButtonX + (startButtonSize - singleTitleWidth) / 2;
    playButton.y = modeTitlesY;
    gGameEngine.stage.addChild(playButton);
    this.elements.push(playButton);

    var iconsY = startButtonY + 13;
    var singleIcon = new createjs.Bitmap("img/betty.png");
    singleIcon.sourceRect = new createjs.Rectangle(0, 0, 48, 48);
    singleIcon.x = startButtonX + (startButtonSize - 48) / 2;
    singleIcon.y = iconsY;
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
