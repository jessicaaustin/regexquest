/* game namespace */
var game = {
 
    data : {
        score : 0
    },

    settings : {
        soundOn: false
    },
     
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
    },



    // Run on game resources loaded.
    "loaded" : function () {
//        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // register our entities
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("ZombieVillager", game.ZombieVillager);

        // player movement
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // toggle sound
        me.input.bindKey(me.input.KEY.F2, "toggleSound");

        // Help window
        me.input.bindKey(me.input.KEY.F1, "toggleHelpWindow");

        // initialize the PuzzleBox
        game.puzzlegui.init();

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};