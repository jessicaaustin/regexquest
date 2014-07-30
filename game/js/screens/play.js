game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {

        // load a level
        me.levelDirector.loadLevel("area01");

        // Background Music
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

        // Help Window
        $("#help").css("top", gameCanvasPos.top + 10)
                  .css("left", gameCanvasPos.left + 120);
        me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "toggleHelpWindow") {
                $("#help").toggle();
            }
        });

		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);

		// stop background music
		me.audio.stopTrack();
	}
});
