
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

            // 1: Literal match, single character
            //      Help me, I've been infected!
            new rq.Zombie("kHkekklpk mkkkekk, Ikkk've beekkkn infkkkekctkked!kk",
                          /k/g ),

            // 2: Single character find, case insensitive ( or use [gG] or use (g|G) )
            //      Mmmm... everyone looks so delicious...
            new rq.Zombie("GMgmmm.G.. GevgergyoGne loogks soG gdelicioGus.G..",
                          /g/gi ),

            // 3: Find with metacharacters
            //      You there! Stop! I want your brains! ... Wait, why am I saying this?
            new rq.Zombie("Y3o2u12 4the4re! 4St4op!43 I w7an4t y73ou4r4 b6r3ains! .5.. Wai1t, w7hy 3am I sayi3ng t3his?",
                          /\d/g ),

            // 4: "one of": [ ... ] or (...|...|...)
            //      Yvonne? Is that you? Where am I? What is going on?
            new rq.Zombie("Yqvzxonne? Iqsz thaxt yqou?z qWhxerqe am Iz? Wxhaqt is gxoingz ozqnx?",
                          /[zxq]/g ),

            // 5: Sub-expression, escape literal, optional char
            //      Did you hear the strange sounds coming from the woods?
            new rq.Zombie("Did you hea(grr)r the str(grrr)ange sounds comi(grrr)ng from the woods?",
                          /\(grrr?\)/g ),

            // 6: Wildcard (.*) and "exactly n" {n}
            //      Everyone is acting so strange since Jonas came back from the woods the other day.
            new rq.Zombie("EvBL90deryone is acting so straBLdpwnge since Jonas came back fromBLdj3 the wooBLqdsds the other dBLuiray.",
                          /BL\w{3}/g ),

            // 7: Range
            //      Oh? A tasty treat? Come here for just a minute...
            new rq.Zombie("O5 h? A4  tas2 ty tr4 eat? Co4 m6 e h2 ere fo4 r j5 ust 1 minut5 e...",
                          /[2-6]\s/g ),

            // 8: Multiple metachar patterns
            //      Yvonne is locked up in her house! Once we're all cured you should go see her!
            new rq.Zombie("Yvoq7xnne is lockx4xed up in her house! Oq1xnce we\'re all curx9xed you should go see hq5xer!",
                          /[qx][0-9]x/g )
        )

    ],

    getByZombie: function(zombieGUID) {
        var puzzle = game.puzzles.zombiesToPuzzles[zombieGUID];
        if (!puzzle) {
            puzzle = game.puzzles.puzzles[game.data.currentLevel][game.puzzles.currentRound];
            game.puzzles.zombiesToPuzzles[zombieGUID] = puzzle;
            game.puzzles.currentRound++;
        }
        return puzzle;
    }

};
