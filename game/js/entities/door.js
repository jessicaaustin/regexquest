
/**
 * Handles moving from one area to another.
 *
 * TODO what is the best practice for transitioning between areas?
 * for example, see http://git.kodewerx.org/neverwell-moor/
 */
game.Door = me.ObjectEntity.extend({

    init: function(x, y, settings) {

        // sprite params
        settings.image = "doorClosed";
        settings.spritewidth = 32;
        settings.spriteheight= 32;

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        this.x = x;
        this.y = y;

        this.parent(x, y, settings);

        // this is given in Tiled
        this.destination = settings.destination;
        game.doors[this.destination] = this;

        this.lock();
        this.opening = false;
    },

    onCollision: function(res, obj) {
        if (this.locked) {
            return;
        }

        // start opening
        if (!this.opening) {
            this.opening = true;
            this.open(obj);
        }
    },

    lock: function() {
        this.locked = true;
        var solidTileId = me.game.collisionMap.tileset.firstgid;
        me.game.collisionMap.setTile(this.x/32, this.y/32, solidTileId);
    },

    unlock: function() {
        this.locked = false;
        me.game.collisionMap.clearTile(this.x/32, this.y/32);
    },

    open: function(player) {

        this.renderable = new me.AnimationSheet(this.x, this.y, me.loader.getImage("doorAnimation"), 32, 32);

        var thisObj = this;
        player.waitForDoor();
        setTimeout(function() {
            thisObj.renderable.image = me.loader.getImage("doorOpen");
            player.startEnteringDoor();
            thisObj.moveToDestination();
        }, 250);

    },

    moveToDestination: function() {
        // TODO how to decentralize this?
        if (this.destination === "yvonneHouse") {
            me.state.change(game.STATE_TO_BE_CONTINUED);
        }
    }

});
