import { bindable, bindingMode } from "aurelia-framework";
import { camelToKebab } from "./camelToKebab";
export function addPropertiesState(aureliaClass, reactprops) {
    var reactpropNames = Object.getOwnPropertyNames(reactprops);
    for (var i = 0; i < reactpropNames.length; i++) {
        var renderPropName = reactpropNames[i];
        bindable({
            name: renderPropName,
            attribute: camelToKebab(renderPropName),
            defaultBindingMode: bindingMode.twoWay
        })(aureliaClass);
    }
}
