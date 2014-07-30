
game.puzzlegui = {

    puzzleBox: null,

    init: function() {
        puzzleBox = $("#puzzleBox");
        gameCanvasPos = me.video.getPos();
        puzzleBox.css("top", gameCanvasPos.top + 100)
                 .css("left", gameCanvasPos.left + 170);

        $("#puzzleBox #help").click(function() {
            $("#puzzleBox .notes").toggle();
        });

    },

    show: function() {
        puzzleBox.show();
        $("#puzzleBox .pattern").focus();
    }

};