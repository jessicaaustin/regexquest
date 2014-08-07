/**
 * Array of zombie puzzles to choose from.
 */
game.puzzles = {

    currentRound: 0,

    puzzles: new Array().concat(

        // TODO add corresponding hints for the early puzzles

        // Single character find
        new rq.Zombie("kHkekklpk mkkkekk, Ikkk've beekkkn infkkkekctkked!kk", /k/g),

        // Single character find, case insensitive
        new rq.Zombie("GgWGhaGtg hgaGppGegngGged tGogG mGeg..g. GIg vigsgited DGrggg. gM. gyegGstergGday aGnGd ngowgg eGveryGogne logogksG sgo deGgliGgcGiogus.G..", /g/gi),

        // Find with metacharacters
        new rq.Zombie("Y23o2u12 4the34re! 4St44op!43 I w7an4t y73ou434r4 b6r34ains! .5.. W7a87it 76a m57i768nute, w7h6y 983am I6 s987ayi3ng t3h0i8s?", /\d/g )
    ),

    getCurrent: function() {
        return game.puzzles.puzzles[game.puzzles.currentRound];
    },

    puzzleSolved: function() {
        game.puzzles.currentRound++;
    }
};
