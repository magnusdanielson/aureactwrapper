System.register(["aurelia-framework", "./camelToKebab"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, camelToKebab_1;
    var __moduleName = context_1 && context_1.id;
    function addPropertiesState(aureliaClass, reactprops) {
        var reactpropNames = Object.getOwnPropertyNames(reactprops);
        for (var i = 0; i < reactpropNames.length; i++) {
            var renderPropName = reactpropNames[i];
            aurelia_framework_1.bindable({
                name: renderPropName,
                attribute: camelToKebab_1.camelToKebab(renderPropName),
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay
            })(aureliaClass);
        }
    }
    exports_1("addPropertiesState", addPropertiesState);
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (camelToKebab_1_1) {
                camelToKebab_1 = camelToKebab_1_1;
            }
        ],
        execute: function () {
        }
    };
});
