"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPropertiesNoState = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var camelToKebab_1 = require("./camelToKebab");
function addPropertiesNoState(aureliaClass, reactprops) {
    var reactpropNames = Object.getOwnPropertyNames(reactprops);
    for (var i = 0; i < reactpropNames.length; i++) {
        var renderPropName = reactpropNames[i];
        aurelia_framework_1.bindable({
            name: renderPropName,
            attribute: camelToKebab_1.camelToKebab(renderPropName),
            changeHandler: 'render',
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay
        })(aureliaClass);
    }
}
exports.addPropertiesNoState = addPropertiesNoState;
