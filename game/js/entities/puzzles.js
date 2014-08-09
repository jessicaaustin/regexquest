/**
 * Array of zombie puzzles to choose from.
 */
game.puzzles = {

    currentRound: 0,

    puzzles: [

        new Array().concat(

            // TODO add corresponding hints for the early puzzles

            // 1: Single character find
            new rq.Zombie("kHkekklpk mkkkekk, Ikkk've beekkkn infkkkekctkked!kk",
                          /k/g),

            // 2: Single character find, case insensitive
            new rq.Zombie("GIg vigsgited DGrggg. gM. gyegGstergGday aGnGd ngowgg eGveryGogne logogksG sgo deGgliGgcGiogus.G..",
                          /g/gi),

            // 3: Find with metacharacters
            new rq.Zombie("Y23o2u12 4the34re! 4St44op!43 I w7an4t y73ou434r4 b6r34ains! .5.. W7a87it 76a m57i768nute, w7h6y 983am I6 s987ayi3ng t3h0i8s?",
                          /\d/g ),

            // 4: "one of": [ ... ] or (...|...|...)
            new rq.Zombie("jHaqzve youx seezqxn xDzr.z Mxq. axrounzd? He hqzasn't exqen in hiqs laz siqnce thxe xaccident qa qqqfew dayqs qxago.x",
                          /[zxq]/g ),

            // 5: TODO: add
            new rq.Zombie("Todo: Add puzzle 5",
                          /5/g ),
            // 6: TODO: add
            new rq.Zombie("Todo: Add puzzle 6",
                          /6/g ),
            // 7: TODO: add
            new rq.Zombie("Todo: Add puzzle 7",
                          /7/g ),
            // 8: TODO: add
            new rq.Zombie("Todo: Add puzzle 8",
                          /8/g )
        )

    ],

    getCurrent: function() {
        return game.puzzles.puzzles[game.data.currentLevel][game.puzzles.currentRound];
    },

    puzzleSolved: function() {
        game.puzzles.currentRound++;
    }

    // TODO need an equivalent of "puzzle skipped" (should tie a puzzle to a particular villager once it's been triggered)
};
