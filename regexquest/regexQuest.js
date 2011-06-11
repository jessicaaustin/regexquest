// define our namespace
var rq = {};

rq.Zombie = function(cleanText, infection) {

    /** Helper functions **/
    var stringArraysEqual = function(a, b) {
        if (!a && b || !b && a) {
            return false;
        }
        return a.join("") == b.join("");
    };

    /** Public functions **/
    this.cleanText = function() {
        return cleanText;
    };

    this.zombieText = function() {
        return cleanText.match(infection);
    };

    this.checkMatch = function(regex) {
        return stringArraysEqual(this.zombieText(), cleanText.match(regex));
    };

    this.whatMatched = function(regex) {
        var matches = cleanText.match(regex);
        if (!matches) {
            return new Array();
        }
        return matches;
    }
};

/** Construct Zombies out of random combinations of the given arrays **/
rq.ZombieFactory = function(cleanStrings, infections) {

};