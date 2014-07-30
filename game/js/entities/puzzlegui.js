
game.puzzlegui = {

    puzzleBoxElem: null,

    patternElem: null,
    modifiersElem: null,
    resultElem: null,

    init: function() {
        puzzleBoxElem = $("#puzzleBox");

        gameCanvasPos = me.video.getPos();
        puzzleBoxElem.css("top", gameCanvasPos.top + 100)
                     .css("left", gameCanvasPos.left + 170);

        patternElem = $("#puzzleBox .pattern");
        modifiersElem = $("#puzzleBox .regexpFlags");
        resultElem = $("#puzzleBox .result");

        $("#puzzleBox #help").click(function() {
            $("#puzzleBox .notes").toggle();
        });

    },

    show: function() {
        puzzleBoxElem.show();
        patternElem.focus();
    },

    clearRegExp: function() {
        patternElem.val("");
        modifiersElem.val("");
    },

    createRegExp: function() {
        var pattern = patternElem.val();
        var modifiers = modifiersElem.val();
        try {
            return new RegExp(pattern, modifiers);
        } catch (err) {
            game.puzzlegui.showResult(false);
        }
    },

    showResult: function(good) {
        if (good) {
            $("#wrongAnswer").hide();
            $("#rightAnswer").show();
            resultElem.css("color", "green");
            $(".infected").fadeOut();
        } else {
            $("#wrongAnswer").show();
            $("#rightAnswer").hide();
            resultElem.css("color", "red");
        }
    },

    checkAnswer: function(zombie) {
        resultElem.text(zombie.whatMatched(game.puzzlegui.createRegExp()).join(" "));
        if (zombie.checkMatch(game.puzzlegui.createRegExp())) {
            game.puzzlegui.showResult(true);
        } else {
            game.puzzlegui.showResult(false);
        }
    },

    userUpdate: function(event) {
        $("#wrongAnswer").hide();
        $("#rightAnswer").hide();
        resultElem.text("");

        // check for enter key press
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code == 13) {
            game.puzzlegui.checkAnswer();
        }
    },

    setupPuzzle: function() {
        var zombie = game.zombies.getCurrent();
        if (!zombie) {
            return;
        }
        $("#zombieText").html(zombie.zombieText());

        game.puzzlegui.clearRegExp();
        patternElem.keypress(function(event) {
            game.puzzlegui.userUpdate(event);
        });
        modifiersElem.keypress(function(event) {
            game.puzzlegui.userUpdate(event);
        });
        $("#checkAnswer").click(function(event) {
            game.puzzlegui.checkAnswer(zombie);
        });
    }

};