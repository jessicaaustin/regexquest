/**
 * HERO
 */
game.PlayerEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {

        // TODO define settings (image, size, etc) here instead of in Tiled

        // call the constructor
        this.parent(x, y, settings);

        // top-down, not side-scroller
        this.gravity = 0.0;
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },

    // TODO use AnimationSheet for decent sprite animations
    update: function(dt) {
 
        if (me.input.isKeyPressed('left')) {
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            this.vel.y -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.vel.y += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
        }
 
        // check & update player movement
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent(dt);
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
 
});

/**
 * ZOMBIE
 */
 game.EnemyEntity = me.ObjectEntity.extend({
     init: function(x, y, settings) {

         settings.image = "zombie";

         // save the area size defined in Tiled
         var width = settings.width;
         var height = settings.height;

         // adjust the size setting information to match the sprite size
         // so that the entity object is created with the right size
         settings.spritewidth = settings.width = 32;
         settings.spritewidth = settings.height = 36;

         // call the parent constructor
         this.parent(x, y , settings);

         // set start/end position based on the initial area size
         x = this.pos.x;
         this.startX = x;
         this.endX   = x + width - settings.spritewidth
         this.pos.x  = x + width - settings.spritewidth;

         // walking & jumping speed
         this.setVelocity(1, 0);

         this.type = me.game.ENEMY_OBJECT;
     },

     // TODO use AnimationSheet for decent sprite animations
     update: function(dt) {
         // do nothing if not in viewport
         if (!this.inViewport)
             return false;

         if (this.alive) {
             if (this.walkLeft && this.pos.x <= this.startX) {
                 this.walkLeft = false;
             } else if (!this.walkLeft && this.pos.x >= this.endX) {
                 this.walkLeft = true;
             }
             // make it walk
             this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

         } else {
             this.vel.x = 0;
         }

         // check and update movement
         this.updateMovement();

         // update animation if necessary
         if (this.vel.x!=0 || this.vel.y!=0) {
             // update object animation
             this.parent(dt);
             return true;
         }
         return false;
     }
 });
