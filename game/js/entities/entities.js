/**
 * HERO
 */
game.PlayerEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {

        // call the constructor
        this.parent(x, y, settings);

        // Set up the sprite animations
        // TODO fix "sliding" walking style
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

        // setup for puzzle
        this.inPuzzle = false;

    },

    update: function(dt) {

        if (this.inPuzzle) {
            // prevent movement
            return false;
        }

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
    },

    startPuzzle: function() {
        this.inPuzzle = true;
    },

    endPuzzle: function() {
        this.inPuzzle = false;
    },

    onPuzzleSuccess: function() {
        // TODO get points, update HUD
        this.endPuzzle();
    },

    onPuzzleFail: function() {
        // TODO lose health, update HUD
        this.endPuzzle();
    },

    onPuzzleEscape: function() {
        this.endPuzzle();
    }

});

/**
 * ZOMBIE
 * TODO: break out into its own file, maybe combine with game.puzzles?
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

         // puzzle setup
         this.inPuzzle = false;
     },

     onCollision : function (res, obj) {
        me.audio.play("zombie2");
        this.startPuzzle(obj);
     },

    startPuzzle: function(player) {

        this.inPuzzle = true;
        this.collidable = false; // prevent collision loop

        player.startPuzzle();

        game.puzzlegui.setupPuzzle(player, this);
    },

    endPuzzle: function() {
        this.inPuzzle = false;

        // flicker and make un-collidable for a while to
        // allow the player to escape if need be
        var flickerTime = 2000;
        this.renderable.flicker(flickerTime)
        var thisObj = this;
        setTimeout(function() {
            thisObj.collidable = true;
        }, flickerTime);
    },

    onPuzzleSuccess: function() {
        // TODO turn into villager, play happy sfx, no longer an enemy
        this.endPuzzle();
    },

    onPuzzleFail: function() {
        // Do nothing until the player succeeds or runs away
    },

    onPuzzleEscape: function() {
        this.endPuzzle();
    },

     update: function(dt) {
         if (!this.inViewport || this.inPuzzle) {
            // prevent movement
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
