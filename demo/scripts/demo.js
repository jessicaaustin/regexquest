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
        resultDiv.text(result.matchedText);
        if (result.fullMatch()) {
            showResult(true);
        } else if (result.partialMatch()) {
            showResult(false);
        } else {
            $("#wrongAnswer").show();
            $("#rightAnswer").hide();
        }
    }
};

$(document).ready(function() {
    var zombie = new rq.Zombie("My cat has a hat.", "cathat");
    $("#zombieText").text(zombie.zombieText);

    window.zombie = zombie;

    $("#regexp").keypress(function(event) {
        runCheck(event);
    });
    $("#regexpFlags").keypress(function(event) {
        runCheck(event);
    });
});