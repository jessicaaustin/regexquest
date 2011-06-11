var zombies = new Array();
var currentRound = 0;

var showResult = function(good) {
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
};

var clearRegExp = function() {
    var pattern = $("#regexp").val("");
    var modifiers = $("#regexpFlags").val("");
};

var createRegExp = function() {
    var pattern = $("#regexp").val();
    var modifiers = $("#regexpFlags").val();
    return new RegExp(pattern, modifiers);
};

var runCheck = function(event) {
    $("#wrongAnswer").hide();
    $("#rightAnswer").hide();
    var resultDiv = $("#result");
    resultDiv.text("");

    // check for enter key press
    var code = (event.keyCode ? event.keyCode : event.which);
    if (code == 13) {
        resultDiv.text(zombie.whatMatched(createRegExp()).join(" "));
        if (zombie.checkMatch(createRegExp())) {
            showResult(true);
        } else {
            showResult(false);
        }
    }
};

var setup = function() {
    var zombie = zombies[currentRound];
    if (!zombie) {
        return;
    }
    $("#zombieText").html(zombie.zombieText());

    // for debug purposes
    window.zombie = zombie;

    clearRegExp();
    $("#rounds").text("Round " + currentRound + " of " + (zombies.length-1));
    $("#regexp").keypress(function(event) {
        runCheck(event);
    });
    $("#regexpFlags").keypress(function(event) {
        runCheck(event);
    });
    currentRound++;
};

$(document).ready(function() {
    zombies = new rq.ZombieFactory([
        "A cat with a hat sat on a mat",
        "My cat, your cat, their cat.",
        "hat Hat mat cat haTT"
    ], [
        /[c|h]at/g,
        /[\w]at/g,
        /cat/,
        /hat/gi
    ]);

    $("#nextRound").click(setup);

    setup();
});