
/**
 * Array of zombie puzzles to choose from.
 */
game.puzzles = {

    currentRound: 0,

    // this ties particular puzzles to particular zombies the player finds on the map
    // that way, if they run away and then come back to a particular zombie, it will have the same puzzle
    zombiesToPuzzles: {},

    puzzles: [

        new Array().concat(
        // Roughly following the progression on this page: http://www.zytrax.com/tech/web/regex.htm

            // 1: Literal match, single character
            //      Help me, I've been infected!
            new rq.Zombie("kHkekklpk mkkkekk, Ikkk've beekkkn infkkkekctkked!kk",
                          /k/g ),

            // 2: Single character find, case insensitive ( or use [gG] or use (g|G) )
            //      Why does everyone look so delicious...
            new rq.Zombie("gWhy Gdoges eGveryGogne logogk sgo deGgliGgcGiogus.G..",
                          /g/gi ),

            // 3: Find with metacharacters
            //      You there! Stop! I want your brains! ... Wait a minute, why am I saying this?
            new rq.Zombie("Y23o2u12 4the34re! 4St44op!43 I w7an4t y73ou434r4 b6r34ains! .5.. W7a8it 7a m7i8nute, w7hy 3am I6 s97ayi3ng t3h0is?",
                          /\d/g ),

            // 4: "one of": [ ... ] or (...|...|...)
            //      Yvonne? Is that you? Where am I? What is going on?
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
            //      Yvonne is locked up in her house! Now that we are all cured you should go see her!
            new rq.Zombie("Yvonne is locked up in her house! Now that we are all cured you should go see her! (TODO: add puzzle)",
                          /Yvonne/g )
        )

    ],

    getByZombie: function(zombieGUID) {
        var puzzle = game.puzzles.zombiesToPuzzles[zombieGUID];
        if (!puzzle) {
            puzzle = game.puzzles.puzzles[game.data.currentLevel][game.puzzles.currentRound];
            game.puzzles.zombiesToPuzzles[zombieGUID] = puzzle;
            game.puzzles.currentRound++;
        }
        return puzzle.zombie;
    }

};
