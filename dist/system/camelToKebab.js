System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function camelToKebab(str) {
        // Matches all places where a two upper case chars followed by a lower case char are and split them with an hyphen
        return str
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
            .toLowerCase();
    }
    exports_1("camelToKebab", camelToKebab);
    return {
        setters: [],
        execute: function () {
        }
    };
});
