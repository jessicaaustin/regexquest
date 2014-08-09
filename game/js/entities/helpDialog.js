
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
        var x = 30;
        var y = 12;
        this.dialog = new me.SpriteObject(x, y, me.loader.getImage("bookOfHealing"), 569, 326);
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