
game.EndGameScreen = me.ScreenObject.extend({

	onResetEvent: function() {

	    game.puzzlegui.hide();

        me.game.world.addChild( new me.SpriteObject(0, 0, me.loader.getImage(this.backgroundImage)), 1 );

        me.input.bindKey(me.input.KEY.ENTER, "reset", true);
        this.enterHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "reset") {
                me.state.change(me.state.MENU);
            }
        });
	},

	onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.event.unsubscribe(this.enterHandler);
	}

});

game.GameOverScreen = game.EndGameScreen.extend({

    backgroundImage: "gameover"

});

game.ToBeContinuedScreen = game.EndGameScreen.extend({

    backgroundImage: "toBeContinued"

});
