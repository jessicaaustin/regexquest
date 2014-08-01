game.PlayScreen = me.ScreenObject.extend({

    setupBackgroundMusic: function() {
        me.audio.playTrack("dst-beyondtheseforests");
        game.settings.soundOn = true;

        this.soundHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
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

    // TODO: since the help dialog is available on any screen in the game, this should be moved to game.js or into its own file
    setupHelpDialog: function() {
        $("#help").css("top", gameCanvasPos.top + 10)
                  .css("left", gameCanvasPos.left + 120);

        this.helpHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
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

        game.data.health = 10;
        game.data.numVillagersSaved = 0;

		this.healthBar = new game.HUD.HealthBar();
		me.game.world.addChild(this.healthBar);

		this.zombieVillagerBar = new game.HUD.ZombieVillagerBar();
		me.game.world.addChild(this.zombieVillagerBar);
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.game.world.removeChild(this.healthBar);
		me.game.world.removeChild(this.zombieVillagerBar);

		me.audio.stopTrack();

		me.event.unsubscribe(this.soundHandler);
		me.event.unsubscribe(this.helpHandler);
	}
});
