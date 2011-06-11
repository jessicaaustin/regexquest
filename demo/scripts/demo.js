var showResult = function(good) {
    if (good) {
        $("#wrongAnswer").hide();
        $("#rightAnswer").show();
        $("#result").css("color", "green");
    } else {
        $("#wrongAnswer").show();
        $("#rightAnswer").hide();
    }
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
        var result = zombie.checkMatch(createRegExp());
        resultDiv.text(result.matchedText());
        if (result.fullMatch()) {
            showResult(true);
        } else {
            showResult(false);
        }
    }
};

$(document).ready(function() {
    var zombie = new rq.Zombie("My cat has a hat.", ["cat", "hat"]);
    $("#zombieText").text(zombie.zombieText);
    $("#infection").text(zombie.infection.join(" "));

    window.zombie = zombie;

    $("#regexp").keypress(function(event) {
        runCheck(event);
    });
    $("#regexpFlags").keypress(function(event) {
        runCheck(event);
    });
});