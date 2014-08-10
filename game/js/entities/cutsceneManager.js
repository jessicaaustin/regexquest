
/**
 * Handles narratives and transitions between levels.
 */
game.CutsceneManager = Object.extend({

	init: function() {
        me.event.subscribe("/level01/allVillagersSaved", this.level01AllVillagersSaved);
	},

	level01AllVillagersSaved: function() {
        game.doors["yvonneHouse"].unlock();
	}

});

