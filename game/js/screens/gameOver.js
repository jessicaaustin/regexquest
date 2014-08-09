game.GameOverScreen = me.ScreenObject.extend({

	onResetEvent: function() {

	    game.puzzlegui.hide();

        me.game.world.addChild( new me.SpriteObject(0, 0, me.loader.getImage("gameover")), 1 );

        me.input.bindKey(me.input.KEY.ENTER, "reset", true);
        this.enterHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "reset") {
                me.state.change(me.state.MENU);
            }
        });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.event.unsubscribe(this.enterHandler);
	}
});
