
/**
 * Handles viewing signs on the map.
 */
game.Sign = me.ObjectEntity.extend({

    init: function(x, y, settings) {

        // sprite params
        settings.image = "sign";
        settings.spritewidth = 32;
        settings.spriteheight= 32;

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        this.parent(x, y, settings);

        // this is given in Tiled
        this.signName = settings.signName;

        this.signViewer = new game.SignViewer();
        me.game.world.addChild(this.signViewer);
    },

    onCollision: function(res, obj) {
        this.viewingSign = true;
        this.signViewer.show(this.signName);
    },

    update: function(dt) {
        // hide sign if we're moving away from it
        // TODO: this method is still very intensive when actually viewing the sign... is there a better way?
        if (this.viewingSign) {
            this.signViewer.hide(this.signName);
            this.viewingSign = false;
            return true;
        }
        return false;
    }

});

game.SignViewer = me.ObjectContainer.extend({

	init: function() {

		this.parent();

		this.isPersistent = false;
		this.collidable = false;

		// make sure our object is always drawn on top
		this.z = Infinity;

		this.signs = {};
	},

	show: function(signName) {
	    var sign = this.signs[signName];
	    if (!sign) {
            var x = 170;
            var y = 80;
            var sign = new me.SpriteObject(x, y, me.loader.getImage(signName + "Sign"), 288, 300);
            sign.floating = true;
            sign.z = 2;
            sign.alpha = 0.8;
            this.signs[signName] = sign;
	    }
	    this.addChild(sign);
	},

	hide: function(signName) {
        this.removeChild(this.signs[signName]);
	}

});
