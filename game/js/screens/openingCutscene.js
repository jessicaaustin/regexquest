game.OpeningCutscene = me.ScreenObject.extend({

	onResetEvent: function() {

        me.game.world.addChild( new me.SpriteObject(0, 0, me.loader.getImage("openingLetter")), 1 );

        me.input.bindKey(me.input.KEY.ENTER, "continue", true);
        me.input.bindKey(me.input.KEY.ESC, "continue", true);
        me.input.bindKey(me.input.KEY.SPACE, "continue", true);
        this.enterHandler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "continue") {
                me.state.change(me.state.PLAY);
            }
        });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.ESC);
        me.input.unbindKey(me.input.KEY.SPACE);
        me.event.unsubscribe(this.enterHandler);
	}
});
