/**
 * The main player.
 */
game.PlayerEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {

        // call the constructor
        this.parent(x, y, settings);

        // Set up the sprite animations
        animationSpeed = 16;

        this.renderable.addAnimation("stand-up", [1]);
        this.renderable.addAnimation("walk-up", [0, 0, 1, 1, 2, 2], animationSpeed);

        this.renderable.addAnimation("stand-right", [5]);
        this.renderable.addAnimation("walk-right", [3, 3, 4, 4, 5, 5], animationSpeed);

        this.renderable.addAnimation("stand-down", [7]);
        this.renderable.addAnimation("walk-down", [6, 6, 7, 7, 8, 8], animationSpeed);

        this.renderable.addAnimation("stand-left", [10]);
        this.renderable.addAnimation("walk-left", [9, 9, 10, 10, 11, 11], animationSpeed);

        // default direction at start
        this.direction = "right";

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
            this.renderable.setCurrentAnimation("walk-" + this.direction);
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
        // lose health, but stay in game until player runs away
        game.data.health -= 1;
        if (game.data.health == 0) {
            me.state.change(me.state.GAMEOVER);
        }
    },

    onPuzzleEscape: function() {
        this.endPuzzle();
    }

});
