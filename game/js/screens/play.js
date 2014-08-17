game.PlayScreen = me.ScreenObject.extend({

    setupBackgroundMusicHandler: function() {
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

    setupLevelOne: function() {
        me.levelDirector.loadLevel("area01");
        game.data.numVillagers = game.puzzles.puzzles[game.data.currentLevel].length;

        me.audio.playTrack("dst-beyondtheseforests", 0.4);
    },

	onResetEvent: function() {
        game.data.health = 10;
        game.data.numVillagersSaved = 0;

        switch(game.data.currentLevel) {
            case 0:
                this.setupLevelOne();
                break;
            default:
                console.error('No level ' + game.data.currentLevel);
        }

        this.setupBackgroundMusicHandler();

		this.healthBar = new game.HUD.HealthBar();
		me.game.world.addChild(this.healthBar);

		this.zombieVillagerBar = new game.HUD.ZombieVillagerBar();
		me.game.world.addChild(this.zombieVillagerBar);

		this.helpDialog = new game.HelpDialog();
		me.game.world.addChild(this.helpDialog);
		var thisObj = this;
        this.helpHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "toggleHelpWindow") {
                thisObj.helpDialog.toggle();
            }
        });
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
