/**
 * HERO
 */
game.PlayerEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {

        // call the constructor
        this.parent(x, y, settings);

        // Set up the sprite animations
        this.renderable.addAnimation("stand-up", [1]);
        this.renderable.addAnimation("up", [0, 1, 2]);

        this.renderable.addAnimation("stand-right", [4]);
        this.renderable.addAnimation("right", [3, 4, 5]);

        this.renderable.addAnimation("stand-down", [7]);
        this.renderable.addAnimation("down", [6, 7, 8]);

        this.renderable.addAnimation("stand-left", [10]);
        this.renderable.addAnimation("left", [9, 10, 11]);

        // default direction at start
        this.direction = "down";

        // top-down, not side-scroller
        this.gravity = 0.0;
 
        // set the default horizontal & vertical speed
        this.setVelocity(3, 3);
        this.setFriction(0.8, 0.8);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },

    update: function(dt) {

        if (me.input.isKeyPressed('left')) {
            this.direction = "left";
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.direction = "right";
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            this.direction = "up";
            this.vel.y -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.direction = "down";
            this.vel.y += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        if(this.vel.y == 0 && this.vel.x == 0) {
            this.renderable.setCurrentAnimation("stand-" + this.direction);
        } else {
            this.renderable.setCurrentAnimation(this.direction);
        }

        // check & update player movement
        this.updateMovement();

        // check for collision
        var collision = me.game.world.collide(this);

        if (collision) {
            // if we collide with an enemy
            if (collision.obj.type == me.game.ENEMY_OBJECT) {
                // bounce back
                this.vel.y = -1*collision.y*this.maxVel.y * me.timer.tick;
                this.vel.x = -1*collision.x*this.maxVel.x * me.timer.tick;
            }
        }
 
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

        // sprite params
        settings.image = "zombie";
        settings.spritewidth = 32;
        settings.spriteheight= 36;

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // call the parent constructor
        this.parent(x, y , settings);

        // Set up the sprite animations
        this.renderable.addAnimation("right", [3, 4, 5]);
        this.renderable.addAnimation("left", [9, 10, 11]);

         // set start/end position based on the initial area size
         x = this.pos.x;
         this.startX = x;
         this.endX   = x + width - settings.spritewidth
         this.pos.x  = x + width - settings.spritewidth;

         // walking speed
         this.setVelocity(1, 0);

         // make it collidable
         this.collidable = true;
         this.type = me.game.ENEMY_OBJECT;
     },

     onCollision : function (res, obj) {
        me.audio.play("zombie3");
     },

     // TODO use AnimationSheet for decent sprite animations
     update: function(dt) {
         // do nothing if not in viewport
         if (!this.inViewport) {
             return false;
         }

         // update position
         if (this.alive) {
             if (this.walkLeft && this.pos.x <= this.startX) {
                 this.walkLeft = false;
                this.renderable.setCurrentAnimation("right");
             } else if (!this.walkLeft && this.pos.x >= this.endX) {
                 this.walkLeft = true;
                this.renderable.setCurrentAnimation("left");
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
