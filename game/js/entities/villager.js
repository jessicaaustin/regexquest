/**
 * Villagers, which have unfortunately been turned into zombies.
 */
game.ZombieVillager = me.ObjectEntity.extend({

    solvedPuzzle: null,

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
         this.isInfected = true;
    },

    onCollision : function (res, obj) {
        if (this.inPuzzle) {
            return;
        }

        if (this.isInfected) {
            me.audio.play("zombie2");
            this.startPuzzle(obj);
        } else {
            this.viewingDialogue = true;
            game.puzzlegui.showSolvedPuzzle(this.solvedPuzzle);
        }

    },

    startPuzzle: function(player) {

        this.inPuzzle = true;

        player.startPuzzle();

        game.puzzlegui.setupPuzzle(player, this);
    },

    delayedDisablePuzzle: function() {
        // flicker and disable for a while to
        // allow the player to escape if need be
        var flickerTime = 2000;
        this.renderable.flicker(flickerTime)
        var thisObj = this;
        setTimeout(function() {
            thisObj.inPuzzle = false;
        }, flickerTime);
    },

    onPuzzleSuccess: function(puzzle) {
        me.audio.play("villagerHealed");
        // update the sprite to be a random villager
        this.renderable.image=me.loader.getImage("villager" + Math.randomInt(1,4));
        game.data.numVillagersSaved++;
        if (game.data.numVillagersSaved == game.data.numVillagers) {
            me.event.publish("/level01/allVillagersSaved");
        }

        // turn into a normal villager
        this.isInfected = false;
        this.viewingDialogue = false;
        this.solvedPuzzle = puzzle;
        this.type = me.game.ACTION_OBJECT;
        this.delayedDisablePuzzle();
    },

    onPuzzleFail: function() {
        // Do nothing until the player succeeds or runs away
    },

    onPuzzleEscape: function() {
        me.audio.play("zombie3");
        this.delayedDisablePuzzle();
    },

     update: function(dt) {
        if (!this.inViewport || (this.isInfected && this.inPuzzle)) {
            // prevent movement
            return false;
        }

        // hide dialogue if we're moving away from the villager
        if (this.viewingDialogue && !me.game.world.collide(this)) {
            game.puzzlegui.hideSolvedPuzzle();
            this.viewingDialogue = false;
        }

         // update position
         if (this.walkLeft && this.pos.x <= this.startX) {
             this.walkLeft = false;
            this.renderable.setCurrentAnimation("right");
         } else if (!this.walkLeft && this.pos.x >= this.endX) {
             this.walkLeft = true;
            this.renderable.setCurrentAnimation("left");
         }
         // make it walk
         this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

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
