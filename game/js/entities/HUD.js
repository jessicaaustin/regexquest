
/**
 * Heads-Up Display
 */

game.HUD = game.HUD || {};

// TODO rename to heart container :)
game.HUD.HealthBar = me.ObjectContainer.extend({

    initHearts: function(x, y) {

		// local copy of the global health
		// (we only want to update when health changes)
		this.health = 0;

		// params
		this.spriteSize = 16;
		this.emptyAlpha = 0.4;
		this.fullAlpha = 1.0

		// initialize hearts
		this.hearts = new Array();
		var spriteSize = 16;
		var hx = 0;
		var hy = 0;
		for (var i=0; i<game.data.maxHealth; i++) {
		    if (i==game.data.maxHealth/2) {
		        hx = 0;
		        hy += spriteSize + 1;
		    }
		    var heartSprite = new me.SpriteObject(x+hx, y+hy, me.loader.getImage("heart"), spriteSize, spriteSize);
		    heartSprite.floating = true;
		    heartSprite.z = 2;
		    heartSprite.alpha = this.emptyAlpha;
		    this.hearts[i] = heartSprite;
		    this.addChild(heartSprite);
		    hx += spriteSize + 1;
		}

    },

	update : function () {
	    // only update when health changes
		if (this.health !== game.data.health) {

		    if (game.data.health > this.health) {
		        // gained health
                for (var i=this.health; i<game.data.health; i++) {
                    // TODO add sound effect
                    this.hearts[i].alpha = this.fullAlpha;
                }
		    } else {
		        // lost health
                for (var i=game.data.health; i<this.health; i++) {
                    // TODO add sound effect
                    this.hearts[i].alpha = this.emptyAlpha;
                }
		    }

			this.health = game.data.health;
			return true;
		}
		return false;
	},

	init: function() {

		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		this.collidable = false;

		// make sure our object is always drawn on top
		this.z = Infinity;

        this.initHearts(10, 10);
	}
});

