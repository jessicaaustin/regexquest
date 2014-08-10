/**
 * Array of zombie puzzles to choose from.
 */
game.puzzles = {

    currentRound: 0,

    puzzles: [

        new Array().concat(

            // 1: Single character find
            new rq.Zombie("kHkekklpk mkkkekk, Ikkk've beekkkn infkkkekctkked!kk",
                          /k/g),

            // 2: Single character find, case insensitive
            new rq.Zombie("gWhy Gdoges eGveryGogne logogk sgo deGgliGgcGiogus.G..",
                          /g/gi),

            // 3: Find with metacharacters
            new rq.Zombie("Y23o2u12 4the34re! 4St44op!43 I w7an4t y73ou434r4 b6r34ains! .5.. W7a8it 7a m7i8nute, w7hy 3am I6 s97ayi3ng t3h0is?",
                          /\d/g ),

            // 4: "one of": [ ... ] or (...|...|...)
            new rq.Zombie("Yqvzxonne? Iqsz thaxt yqou?z qWhxerqe am Iz? Wxhaqt is gxoingz ozqnx?",
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
            new rq.Zombie("Todo: Add puzzle 8 (Yvonne is locked up in her house! Now that we are all cured you should go see her!)",
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
