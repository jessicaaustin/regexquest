// define our namespace
var rq = {};

rq.MatchResult = function(desiredText, matchedText) {

    /** Helper functions **/

    var stringArraysEqual = function(a, b) {
        if (!a && b || !b && a) {
            return false;
        }
        return a.join("") == b.join("");
    };

    /** Public functions **/

    this.matchedText = function() {
        return matchedText ? matchedText.join(" ") : "";
    };
    this.fullMatch = function() {
        return stringArraysEqual(desiredText, matchedText);
    };
};

rq.Zombie = function(zombieText, infection) {
    this.zombieText = zombieText;
    this.infection = infection;
    this.checkMatch = function(regex) {
        return new rq.MatchResult(infection, zombieText.match(regex));
    }
};
