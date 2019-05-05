System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function camelToKebab(str) {
        // Matches all places where a two upper case chars followed by a lower case char are and split them with an hyphen
        //@ts-ignore
        return str.replace(/([a-zA-Z])([A-Z][a-z])/g, function (match, before, after) {
            return before.toLowerCase() + "-" + after.toLowerCase();
        }).toLowerCase();
    }
    exports_1("camelToKebab", camelToKebab);
    return {
        setters: [],
        execute: function () {
        }
    };
});
