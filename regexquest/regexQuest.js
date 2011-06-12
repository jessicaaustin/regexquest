Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


// define our namespace
var rq = {};

rq.util = {};

rq.util.escapeXml = function(string) {
    return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

rq.util.stringArraysEqual = function(a, b) {
    if (!a && b || !b && a) {
        return false;
    }
    return a.join("") == b.join("");
};

rq.util.randomInt = function(max) {
    return Math.floor(Math.random() * max);
};

rq.Zombie = function(fullText, infection) {

    /** Public functions **/
    this.fullText = function() {
        return fullText;
    };

    this.infectedText = function() {
        return fullText.match(infection);
    };

    this.checkMatch = function(regex) {
        return rq.util.stringArraysEqual(this.infectedText(), fullText.match(regex));
    };

    this.whatMatched = function(regex) {
        var matches = fullText.match(regex);
        if (!matches) {
            return new Array();
        }
        return matches;
    };

    this.zombieTextArray = function() {
        var uninfectedText = fullText.split(infection);
        if (uninfectedText[0] == "") {
            uninfectedText.remove(0);
        }
        if (uninfectedText[uninfectedText.length - 1] == "") {
            uninfectedText.remove(uninfectedText.length - 1);
        }
        var infectedText = this.infectedText();

        var zombieText = new Array();

        var infectedGoesFirst = fullText.indexOf(infectedText[0]) == 0;

        var j = 0;
        for (var i = 0; i < uninfectedText.length + infectedText.length; i++) {
            var infectedHash = {text: infectedText[i], infected: true};
            var uninfectedHash = {text: uninfectedText[i], infected: false};
            if (uninfectedText[i] && infectedText[i]) {
                if (infectedGoesFirst) {
                    zombieText[j] = infectedHash;
                    zombieText[j + 1] = uninfectedHash;
                } else {
                    zombieText[j] = uninfectedHash;
                    zombieText[j + 1] = infectedHash;
                }
                j += 2;
            } else if (uninfectedText[i]) {
                zombieText[j] = uninfectedHash;
                j++;
            } else if (infectedText[i]) {
                zombieText[j] = infectedHash;
                j++;
            }
        }
        return zombieText;
    };

    this.zombieText = function() {
        var zombieTextArray = this.zombieTextArray();
        var zombieText = "";
        for (var i = 0; i < zombieTextArray.length; i++) {
            var text = zombieTextArray[i].text;
            var infected = zombieTextArray[i].infected;
            zombieText += "<span class='" + (infected ? "infected" : "uninfected") + "'>" + rq.util.escapeXml(text) + "</span>";
        }
        return zombieText;
    };


    if (!this.infectedText()) {
        console.error("no match for text='" + fullText + "' and regexp=" + infection);
    }
};

/** Construct Zombies out of random combinations of the given arrays **/
rq.ZombieFactory = function(cleanStrings, infections) {
    var ints = new Array();
    for (var i = 0; i < cleanStrings.length; i++) {
        ints[i] = i;
    }

    var zombies = new Array();
    for (var i = 0; i < infections.length; i++) {
        var string = cleanStrings[ints[rq.util.randomInt(cleanStrings.length)]];
        zombies[i] = new rq.Zombie(string, infections[i]);
    }
    return zombies;
};