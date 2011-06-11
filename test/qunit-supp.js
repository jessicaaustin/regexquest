/** Make QUnit behave more like JUnit **/

var assertTrue = function(state) {
    return ok(state, "");
};
var assertFalse = function(state) {
    return ok(!state, "");
};
var assertEquals = function(expected, actual) {
    return equal(actual, expected, "");
};
var assertArrayEquals = function(expected, actual) {
    return deepEqual(actual, expected, "");
};