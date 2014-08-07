/**
 * Dialog to show and handle the zombie puzzles.
 */
game.PuzzleGUI = Object.extend({

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

        thisObj = this;
        patternElem.keydown(function(event) {
            thisObj.userUpdate(event);
        });
        modifiersElem.keydown(function(event) {
            thisObj.userUpdate(event);
        });
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
            this.showResult(false);
        }
    },

    showResult: function(good) {
        if (good) {
            game.puzzles.puzzleSolved();
            $("#wrongAnswer").hide();
            $("#rightAnswer").show();
            resultElem.css("color", "green");
            $(".infected").fadeOut();
            puzzleBoxElem.delay( 1800 ).fadeOut( 2000 );
            this.playerEntity.onPuzzleSuccess();
            this.zombieEntity.onPuzzleSuccess();
        } else {
            $("#wrongAnswer").show();
            $("#rightAnswer").hide();
            resultElem.css("color", "red");
            this.playerEntity.onPuzzleFail();
            this.zombieEntity.onPuzzleFail();
        }
    },

    runAway: function() {
        this.hide();
        this.playerEntity.onPuzzleEscape();
        this.zombieEntity.onPuzzleEscape();
    },

    checkAnswer: function() {
        resultElem.text(this.puzzle.whatMatched(this.createRegExp()).join(" "));
        if (this.puzzle.checkMatch(this.createRegExp())) {
            this.showResult(true);
        } else {
            this.showResult(false);
        }
    },

    userUpdate: function(event) {
        $("#wrongAnswer").hide();
        $("#rightAnswer").hide();
        resultElem.text("");

        // check for enter or esc key press
        var code = (event.which);
        if (code == 13) {
            this.checkAnswer();
        } else if (code == 27) {
            this.runAway();
        }
    },

    setupPuzzle: function(playerEntity, zombieEntity) {
        this.puzzle = game.puzzles.getCurrent();
        if (!this.puzzle) {
            return;
        }
        $("#zombieText").html(this.puzzle.zombieText());

        this.playerEntity = playerEntity;
        this.zombieEntity = zombieEntity;

        this.clearRegExp();
        this.show();
    }

});