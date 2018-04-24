var InputEngine = function () {
    /**
     * A dictionary mapping ASCII key codes to string values describing
     * the action we want to take when that key is pressed.
     */
    this.bindings = {};

    /**
     * A dictionary mapping actions that might be taken in our game
     * to a boolean value indicating whether that action is currently being performed.
     */
    this.actions = {};

    this.possessed = null;
    this.subscribers = [];
};

InputEngine.prototype.setupBindings = function() {
    this.bind(37, 'left');
    this.bind(38, 'up');
    this.bind(39, 'right');
    this.bind(40, 'down');

    this.bind(81, 'bomb');
    this.bind(32, 'jump');

    this.bind(27, 'escape');

    // move multiple presses with fps frequency
    this.keyboardController({
        37 : this.onKeyDown,
        38 : this.onKeyDown,
        39 : this.onKeyDown,
        40 : this.onKeyDown
    }, 1000 / this.fps);

    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
};

InputEngine.prototype.bind = function(key, action) {
    this.bindings[key] = action;
};

InputEngine.prototype.onKeyUp = function(event) {
    var action = gInputEngine.bindings[event.keyCode];
    if (action) {
        gInputEngine.actions[action] = false;
        event.preventDefault();
    }
    return false;
};

InputEngine.prototype.onKeyDown = function(event) {
    var action = gInputEngine.bindings[event.keyCode];
    if (action) {
        gInputEngine.actions[action] = true;
        var subscribers = gInputEngine.subscribers[action];
        if (subscribers) {
            for (var i in subscribers) {
                subscribers[i]()
            }
        }

        event.preventDefault();
    }
    return false;
};

InputEngine.prototype.subscribe = function (action, callback) {
    this.subscribers[action] = this.subscribers[action] || [];
    this.subscribers[action].push(callback)
};

InputEngine.prototype.unsubscribeAll = function () {
    this.subscribers = [];
};

// Keyboard input with customisable repeat (set to 0 for no key repeat)
InputEngine.prototype.keyboardController = function(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    var timers = {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    document.onkeydown = function(event) {
        var key = (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key] = null;
            keys[key](event);
            if (repeat !== 0)
                var f = function () {
                    keys[key](event);
                };
            timers[key]= setInterval(f, repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    document.onkeyup = function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key] !== null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    window.onblur = function() {
        for (var timer in timers)
            if (timers[timer] !== null)
                clearInterval(timers[timer]);
        timers = {};
    };
};

gInputEngine = new InputEngine();
