
game.zombies = {

    currentRound: 0,  // TODO move this into game logic

    // TODO: puzzles with interesting sentences, that reveal themselves after infection is gone
    // for example:
    // My cat name hat is Joe, cat I'm the hat village hat blacksmith!
    //  => My name is Joe, I'm the village blacksmith!
    puzzles: new Array().concat(
        // basics
        new rq.ZombieFactory([
            "My cat name hat is Joe, cat I'm the hat village hat blacksmith!",
            "Pleacatse hhatelp me... I thicatnk my soncat is very sihatck..."
//            "hat Hat mat cat haTT"
        ], [
            /[ch]at/g,
//            /[\w]at/g,
//            /cat/,
//            /hat/gi
        ]),
        // TODO: + vs * and ? and n number of matches
        // optionals and negation
        new rq.ZombieFactory([
            "<html><h1>Top Header</h1><p>Lorem ipsum dolor sit amet.</p><h2>Next Header</h2><p>Neque porro quisquam est </p><H1>Top header 2</H1><h2>Next Header 2</h2><h3>Low Header</h3></html>"
        ], [
            /a|e|i|o|u/ig,
            /<h1\b[^>]*>(.*?)<\/h1>/gi,
            /<h\d\b[^>]*>(.*?)<\/h\d>/gi
        ]),
        // TODO: start of line, end of line
        // TODO: multi-line
        // more difficult
        new rq.ZombieFactory([
            "Right now it is 11:01am, we're leaving at 2:05 pm, and we'll be there by 4:15 PM."
        ], [
            /\d+/
            ])
    ),

    getCurrent: function() {
        // TODO better way to reference?
        return game.zombies.puzzles[game.zombies.currentRound];
    }
};
