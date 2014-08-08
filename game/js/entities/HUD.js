
/**
 * Heads-Up Display
 */

game.HUD = game.HUD || {};

game.HUD.HealthBar = me.ObjectContainer.extend({

    initHearts: function(x, y) {

        // add background bar
        var heartBar = new me.SpriteObject(x, y, me.loader.getImage("heartBar"), 151, 47);
        heartBar.floating = true;
        heartBar.z = 2;
        this.addChild(heartBar);
        x += 7; // account for border
        y += 6;

		// local copy of the global health
		// (we only want to update when health changes)
		this.health = game.data.health;

		// params
		var spriteSize = 16;
		this.emptyAlpha = 0.4;
		this.fullAlpha = 1.0

		// initialize hearts
		this.hearts = new Array();
		var hx = 0;
		var hy = 0;
		for (var i=0; i<game.data.maxHealth; i++) {
		    if (i==game.data.maxHealth/2) {
		        hx = 0;
		        hy += spriteSize + 1;
		    }
		    var heartSprite = new me.SpriteObject(x+hx, y+hy, me.loader.getImage("heart"), spriteSize, spriteSize);
		    heartSprite.floating = true;
		    heartSprite.z = 3;
		    if (i<this.health) {
		        heartSprite.alpha = this.fullAlpha;
		    } else {
		        heartSprite.alpha = this.emptyAlpha;
		    }
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
                    me.audio.play("heartIncrease", false, null, 0.2);
                    this.hearts[i].alpha = this.fullAlpha;
                }
		    } else {
		        // lost health
                for (var i=game.data.health; i<this.health; i++) {
                    me.audio.play("heartDecrease", false, null, 0.8);
                    this.hearts[i].alpha = this.emptyAlpha;
                    // TODO add flickering
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


game.HUD.ZombieVillagerBar = me.ObjectContainer.extend({

    createSprite: function(imageName, x, y) {
        var sprite = new me.SpriteObject(x, y, me.loader.getImage(imageName), this.spriteWidth, this.spriteWidth);
        sprite.floating = true;
        sprite.z = 3;
        return sprite;
    },

    initZombieVillagers: function(x, y) {

        // add background bar
        var zombieBar = new me.SpriteObject(x, y, me.loader.getImage("zombieBar"), 110, 66);
        zombieBar.floating = true;
        zombieBar.z = 2;
        this.addChild(zombieBar);
        x += 7; // account for border
        y += 6;

		// local copy of the global zombie kill count
		// (we only want to update when health changes)
		this.numVillagersSaved = game.data.numVillagersSaved;

		// params
		this.spriteWidth = 24;
		this.spriteHeight = 28;

		// initialize zombie/villagers
		this.zombieVillagers = new Array();
		var hx = 0;
		var hy = 0;
		for (var i=0; i<game.data.numVillagers; i++) {
		    if (i==4) { // 2 rows of 4
		        hx = 0;
		        hy += this.spriteHeight + 1;
		    }
		    var zombieSprite = this.createSprite("singleZombie", x+hx, y+hy);
		    this.zombieVillagers[i] = zombieSprite;
		    this.addChild(zombieSprite);
		    hx += this.spriteWidth + 1;
		}

    },

	update : function () {
	    // only update when num villagers saved changes
		if (this.numVillagersSaved !== game.data.numVillagersSaved) {

            i = game.data.numVillagersSaved - 1;

            var zombieSprite = this.zombieVillagers[i];

		    var villagerSprite = this.createSprite("singleVillager", zombieSprite.pos.x, zombieSprite.pos.y);
		    this.zombieVillagers[i] = villagerSprite;
		    this.addChild(villagerSprite);

		    this.removeChild(zombieSprite);

			this.numVillagersSaved = game.data.numVillagersSaved;
			return true;
		}
		return false;
	},

	init: function() {

		this.parent();

		this.collidable = false;

		// make sure our object is always drawn on top
		this.z = Infinity;

        this.initZombieVillagers(520, 11);
	}
});
