var Menu = function () {
    this.visible = true;
    this.views = [];
};

Menu.prototype.showLoader = function () {
    var bgGraphics = new createjs.Graphics()
        .beginFill("#000000")
        .drawRect(0, 0, gGameEngine.size.w, gGameEngine.size.h);
    var bg = new createjs.Shape(bgGraphics);
    gGameEngine.stage.addChild(bg);

    var loadingText = new createjs.Text("Loading...", "20px Helvetica", "#FFFFFF");
    loadingText.x = gGameEngine.size.w / 2 - loadingText.getMeasuredWidth() / 2;
    loadingText.y = gGameEngine.size.h / 2 - loadingText.getMeasuredHeight() / 2 - 150;
    gGameEngine.stage.addChild(loadingText);

    gGameEngine.stage.update();
};

Menu.prototype.show = function () {
    this.visible = true;
    this.draw();
};

Menu.prototype.hide = function () {
    this.visible = false;

    for (var i = 0; i < this.views.length; i++) {
        gGameEngine.stage.removeChild(this.views[i]);
    }

    this.views = [];
};

Menu.prototype.showWithText = function (text, color) {
    this.visible = true;
    this.draw(text, color);
};

Menu.prototype.draw = function (text, color) {
    this.drawBackground();
    this.drawStartButton();
    this.drawText(text, color);
};

Menu.prototype.update = function () {
    if (!this.views) {
        return;
    }

    for (var i = 0; i < this.views.length; i++) {
        gGameEngine.moveToFront(this.views[i]);
    }
};

Menu.prototype.drawBackground = function () {
    var bgGraphics = new createjs.Graphics()
        .beginFill("rgba(0, 0, 0, 0.5)")
        .drawRect(0, 0, gGameEngine.size.w, gGameEngine.size.h);

    var bg = new createjs.Shape(bgGraphics);
    gGameEngine.stage.addChild(bg);
    this.views.push(bg);
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
    this.views.push(gameText);
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
    this.views.push(singleBg);
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
    this.views.push(playButton);

    var iconsY = startButtonY + 13;
    var singleIcon = new createjs.Bitmap("img/betty.png");
    singleIcon.sourceRect = new createjs.Rectangle(0, 0, 48, 48);
    singleIcon.x = startButtonX + (startButtonSize - 48) / 2;
    singleIcon.y = iconsY;
    gGameEngine.stage.addChild(singleIcon);
    this.views.push(singleIcon);
};

Menu.prototype.setHandCursor = function (btn) {
    btn.addEventListener('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    btn.addEventListener('mouseout', function () {
        document.body.style.cursor = 'auto';
    });
};
