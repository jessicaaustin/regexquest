/**
 * Dialog to show and handle the zombie puzzles.
 */
game.PuzzleGUI = Object.extend({

    puzzleBoxElem: null,
    puzzleBoxAnsweredElem: null,

    patternElem: null,
    modifiersElem: null,
    resultElem: null,

    playerEntity: null,
    zombieEntity: null,

    puzzle: null,

    locked: false,

    init: function() {
        puzzleBoxElem = $("#puzzleBox");
        puzzleBoxAnsweredElem = $("#puzzleBoxAnswered");

        gameCanvasPos = me.video.getPos();
        puzzleBoxElem.css("top", gameCanvasPos.top + 342)
                     .css("left", gameCanvasPos.left + 114);
        puzzleBoxAnsweredElem.css("top", gameCanvasPos.top + 342)
                             .css("left", gameCanvasPos.left + 114);

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
        puzzleBoxElem.clearQueue();
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

            $("#wrongAnswer").hide();
            $("#rightAnswer").show();
            resultElem.css("color", "green");
            $(".infected").fadeOut();
            puzzleBoxElem.delay( 2500 ).fadeOut( 250 );

            this.playerEntity.onPuzzleSuccess();
            this.zombieEntity.onPuzzleSuccess(this.puzzle);

            // prevent multiple successes
            this.locked = true;

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
        var regex = this.createRegExp();
        resultElem.text(this.puzzle.whatMatched(regex).join(" "));
        if (this.puzzle.checkMatch(regex)) {
            this.showResult(true);
        } else {
            this.showResult(false);
        }
    },

    resetResultsArea: function() {
        $("#wrongAnswer").hide();
        $("#rightAnswer").hide();
        resultElem.text("");
    },

    userUpdate: function(event) {
        this.resetResultsArea();

        // check for enter or esc key press
        var code = (event.which);
        if (code == 13 && !this.locked) {
            this.checkAnswer();
        } else if (code == 27) {
            this.runAway();
        }
    },

    setupPuzzle: function(playerEntity, zombieEntity) {
        this.puzzle = game.puzzles.getByZombie(zombieEntity.GUID);

        $("#zombieText").html(this.puzzle.zombieText());

        this.playerEntity = playerEntity;
        this.zombieEntity = zombieEntity;

        this.locked = false;
        this.clearRegExp();
        this.resetResultsArea();
        this.show();
    },

    showSolvedPuzzle: function(puzzle) {
        if (puzzleBoxAnsweredElem.css("display")!=="none") {
            return;
        }

        $("#originalZombieText").html(puzzle.zombieText());
        $("#regexAnswered").html(puzzle.latestRegex);
        $("#cleanedZombieText").html(puzzle.uninfectedText);
        puzzleBoxAnsweredElem.show();
    },

    hideSolvedPuzzle: function() {
        puzzleBoxAnsweredElem.hide();
    }

});