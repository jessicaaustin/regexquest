game.TitleScreen = me.ScreenObject.extend({

	onResetEvent: function() {	
        me.game.world.addChild( new me.SpriteObject(0, 0, me.loader.getImage("title")), 1 );

        // change to play state on press Enter
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        this.enterHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                me.state.change(me.state.PLAY);
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
