/** Make QUnit behave more like JUnit **/

var assertTrue = function(state, message) {
    return ok(state, message);
};
var assertFalse = function(state, message) {
    return ok(!state, message);
};
var assertEquals = function(expected, actual, message) {
    return equal(actual, expected, message);
};