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

$(document).ready(function() {
    var zombie = new rq.Zombie("My cat has a hat.", /[c|h]at/g);
    $("#infection").text(zombie.infectedText().join(" "));
    $("#zombieText").html(zombie.zombieText());

    // for debug purposes
    window.zombie = zombie;

    $("#regexp").keypress(function(event) {
        runCheck(event);
    });
    $("#regexpFlags").keypress(function(event) {
        runCheck(event);
    });
});