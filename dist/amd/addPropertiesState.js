define(["require", "exports", "aurelia-framework", "./camelToKebab"], function (require, exports, aurelia_framework_1, camelToKebab_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addPropertiesState = void 0;
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
    exports.addPropertiesState = addPropertiesState;
});
