game.PlayScreen = me.ScreenObject.extend({

    setupBackgroundMusic: function() {
        me.audio.playTrack("dst-beyondtheseforests");
        game.settings.soundOn = true;

        me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
           if (action === "toggleSound") {
              if (game.settings.soundOn) {
                 me.audio.muteAll();
                 game.settings.soundOn = false;
              } else {
                 me.audio.unmuteAll();
                 game.settings.soundOn = true;
              }
           }
        });
    },

    setupHelpDialog: function() {
        $("#help").css("top", gameCanvasPos.top + 10)
                  .css("left", gameCanvasPos.left + 120);

        me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "toggleHelpWindow") {
                $("#help").toggle();
            }
        });
    },

	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {

        me.levelDirector.loadLevel("area01");

        this.setupBackgroundMusic();

        this.setupHelpDialog();

		// reset the score
		game.data.score = 0;

		this.healthBar = new game.HUD.HealthBar();
		me.game.world.addChild(this.healthBar);
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.game.world.removeChild(this.HUD);

		me.audio.stopTrack();
	}
});
