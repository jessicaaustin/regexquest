
/**
 * Toggleable help dialog.
 */

game.HelpDialog = me.ObjectContainer.extend({

	init: function() {

		this.parent();

		this.isPersistent = false;
		this.collidable = false;

		// make sure our object is always drawn on top
		this.z = Infinity;

        // add image
        var x = 125;
        var y = 25;
        this.dialog = new me.SpriteObject(x, y, me.loader.getImage("help"), 380, 308);
        this.dialog.floating = true;
        this.dialog.z = 2;

        // initially disabled
        this.dialogEnabled = false;
	},

	toggle: function() {
        if (this.dialogEnabled) {
            this.removeChild(this.dialog, true);
            this.dialogEnabled = false;
        } else {
            this.addChild(this.dialog);
            this.dialogEnabled = true;
        }
        this.update(0);
	}


});