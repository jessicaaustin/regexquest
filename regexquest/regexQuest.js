// define our namespace
var rq = {};

rq.MatchResult = function(fullText, matchedText) {
    this.fullText = fullText;
    this.matchedText = matchedText;
    this.matched = fullText === matchedText;
};

rq.Zombie = function(zombieText, humanText) {
    this.zombieText = zombieText;
    this.humanText = humanText;
};

rq.Zombie.prototype.checkMatch = function(regex) {
    var match = this.zombieText.match(regex);
    if (!match) {
        return false;
    }
    return this.humanText === match.join("");
};