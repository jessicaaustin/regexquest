
/**
 * Collecting hearts replenishes health.
 */
game.HeartItem = me.CollectableEntity.extend({

    init: function(x, y, settings) {

        // sprite params
        settings.image = "heartItem";
        settings.spritewidth = 24;
        settings.spriteheight= 24;

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        this.parent(x, y, settings);
    },

    onCollision: function() {
        // do nothing if we're not already at max health
        if (game.data.health == game.data.maxHealth)  {
            return;
        }

        game.data.health += 1;
        // make sure it cannot be collected "again"
        this.collidable = false;
        me.game.world.removeChild(this);
    }

});
