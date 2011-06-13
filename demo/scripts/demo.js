var zombies = new Array();
var currentRound = 0;

var patternElem = $("#pattern");
var modifiersElem = $("#regexpFlags");

var demo = {

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
            demo.showResult(false);
        }
    },

    showResult: function(good) {
        if (good) {
            $("#wrongAnswer").hide();
            $("#rightAnswer").show();
            $("#result").css("color", "green");
            $(".infected").fadeOut();
        } else {
            $("#wrongAnswer").show();
            $("#rightAnswer").hide();
            $("#result").css("color", "red");
        }
    },

    runCheck: function(event) {
        $("#wrongAnswer").hide();
        $("#rightAnswer").hide();
        var resultDiv = $("#result");
        resultDiv.text("");

        // check for enter key press
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code == 13) {
            resultDiv.text(zombie.whatMatched(demo.createRegExp()).join(" "));
            if (zombie.checkMatch(demo.createRegExp())) {
                demo.showResult(true);
            } else {
                demo.showResult(false);
            }
        }
    },

    setup: function() {
        var zombie = zombies[currentRound];
        if (!zombie) {
            return;
        }
        $("#zombieText").html(zombie.zombieText());

        // for debug purposes
        window.zombie = zombie;

        demo.clearRegExp();
        $("#rounds").text("Round " + (currentRound + 1) + " of " + zombies.length);
        patternElem.keypress(function(event) {
            demo.runCheck(event);
        });
        modifiersElem.keypress(function(event) {
            demo.runCheck(event);
        });
        currentRound++;
    }
};

$(document).ready(function() {
    // todo: make sure to get everything in http://www.zytrax.com/tech/web/regex.htm
    zombies = zombies.concat(
            // basics
            new rq.ZombieFactory([
                "A cat with a hat sat on a mat",
                "A hat: My cat, your cat, their cat.",
                "hat Hat mat cat haTT"
            ], [
                /[c|h]at/g,
                /[\w]at/g,
                /cat/,
                /hat/gi
            ]),
            // todo: + vs * and ? and n number of matches
            // optionals and negation
            new rq.ZombieFactory([
                "<html><h1>Top Header</h1><p>Lorem ipsum dolor sit amet.</p><h2>Next Header</h2><p>Neque porro quisquam est </p><H1>Top header 2</H1><h2>Next Header 2</h2><h3>Low Header</h3></html>"
            ], [
                /a|e|i|o|u/ig,
                /<h1\b[^>]*>(.*?)<\/h1>/gi,
                /<h\d\b[^>]*>(.*?)<\/h\d>/gi
            ]),
            // todo: start of line, end of line
            // todo: multi-line
            // more difficult
            new rq.ZombieFactory([
                "Right now it is 11:01am, we're leaving at 2:05 pm, and we'll be there by 4:15 PM."
            ], [
                /\d+/
            ])
    );

    $("#nextRound").click(demo.setup);

    demo.setup();
});