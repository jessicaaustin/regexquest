
game.puzzlegui = {

    // TODO better way to access these variables?

    puzzleBoxElem: null,

    patternElem: null,
    modifiersElem: null,
    resultElem: null,

    playerEntity: null,
    zombieEntity: null,

    puzzle: null,

    init: function() {
        puzzleBoxElem = $("#puzzleBox");

        gameCanvasPos = me.video.getPos();
        puzzleBoxElem.css("top", gameCanvasPos.top + 340)
                     .css("left", gameCanvasPos.left + 120);

        patternElem = $("#puzzleBox .pattern");
        modifiersElem = $("#puzzleBox .regexpFlags");
        resultElem = $("#puzzleBox .result");
    },

    show: function() {
        puzzleBoxElem.show();
        patternElem.focus();
    },

    hide: function() {
        puzzleBoxElem.hide();
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
            puzzleBoxElem.delay( 2000 ).fadeOut( 800 );
            game.puzzlegui.playerEntity.onPuzzleSuccess();
            game.puzzlegui.zombieEntity.onPuzzleSuccess();
        } else {
            $("#wrongAnswer").show();
            $("#rightAnswer").hide();
            resultElem.css("color", "red");
            game.puzzlegui.playerEntity.onPuzzleFail();
            game.puzzlegui.zombieEntity.onPuzzleFail();
        }
    },

    runAway: function() {
        game.puzzlegui.hide();
        game.puzzlegui.playerEntity.onPuzzleEscape();
        game.puzzlegui.zombieEntity.onPuzzleEscape();
    },

    checkAnswer: function() {
        resultElem.text(game.puzzlegui.puzzle.whatMatched(game.puzzlegui.createRegExp()).join(" "));
        if (game.puzzlegui.puzzle.checkMatch(game.puzzlegui.createRegExp())) {
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
        // TODO use global melonjs bindings instead
        var code = (event.which);
        if (code == 13) {
            game.puzzlegui.checkAnswer();
        } else if (code == 27) {
            game.puzzlegui.runAway();
        }
    },

    setupPuzzle: function(playerEntity, zombieEntity) {
        game.puzzlegui.puzzle = game.puzzles.getCurrent();
        if (!game.puzzlegui.puzzle) {
            return;
        }
        $("#zombieText").html(game.puzzlegui.puzzle.zombieText());

        game.puzzlegui.playerEntity = playerEntity;
        game.puzzlegui.zombieEntity = zombieEntity;

        game.puzzlegui.clearRegExp();
        patternElem.keydown(function(event) {
            game.puzzlegui.userUpdate(event);
        });
        modifiersElem.keydown(function(event) {
            game.puzzlegui.userUpdate(event);
        });
        game.puzzlegui.show();
    }

};