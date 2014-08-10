/* game namespace */
var game = {
 
    data : {
        currentLevel: 0,
        health: 0,
        maxHealth: 16,
        numVillagers: 0,
        numVillagersSaved: 0
    },

    settings : {
        soundOn: false
    },

    doors: {},

    puzzlegui: null,
     
    // Run on page load.
    "onload" : function () {
 
        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
         
        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }
 
        // Initialize the audio.
        me.audio.init("mp3,ogg");
 
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
      
        // Load the resources.
        me.loader.preload(game.resources);
 
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);

        // add custom states
        this.STATE_OPENING_CUTSCENE = me.state.USER + 0;
        this.STATE_TO_BE_CONTINUED = me.state.USER + 1;
    },


    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(this.STATE_OPENING_CUTSCENE, new game.OpeningCutscene());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(this.STATE_TO_BE_CONTINUED, new game.ToBeContinuedScreen());
        me.state.set(me.state.GAMEOVER, new game.GameOverScreen());

        // register our entities
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("ZombieVillager", game.ZombieVillager);
        me.pool.register("HeartItem", game.HeartItem);
        me.pool.register("Door", game.Door);
        me.pool.register("Sign", game.Sign);

        // player movement
        var preventDefault = false; // allow user to move left/right arrow keys while in the puzzle box
        me.input.bindKey(me.input.KEY.LEFT,  "left", false, preventDefault);
        me.input.bindKey(me.input.KEY.RIGHT, "right", false, preventDefault);
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // toggle sound
        me.input.bindKey(me.input.KEY.F2, "toggleSound");

        // Help window
        me.input.bindKey(me.input.KEY.F1, "toggleHelpWindow");

        // initialize the PuzzleBox
        game.puzzlegui = new game.PuzzleGUI();

        // Start up cutscene manager
        game.cutsceneManager = new game.CutsceneManager();

        // Start the game.
        me.state.change(me.state.MENU);

        // enable fading state transitions
        me.state.transition("fade", "000000", 1000);
    }
};