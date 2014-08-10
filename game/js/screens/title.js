game.TitleScreen = me.ScreenObject.extend({

	onResetEvent: function() {	
        me.game.world.addChild( new me.SpriteObject(0, 0, me.loader.getImage("title")), 1 );

        me.input.bindKey(me.input.KEY.ENTER, "start", true);
        this.enterHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "start") {
                me.state.change(game.STATE_OPENING_CUTSCENE);
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
