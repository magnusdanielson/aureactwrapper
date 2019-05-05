import { bindable, bindingMode } from 'aurelia-framework';
import { camelToKebab } from './camelToKebab';
export function addPropertiesNoState(aureliaClass, reactprops) {
    var reactpropNames = Object.getOwnPropertyNames(reactprops);
    for (var i = 0; i < reactpropNames.length; i++) {
        var renderPropName = reactpropNames[i];
        bindable({
            name: renderPropName,
            attribute: camelToKebab(renderPropName),
            changeHandler: 'render',
            defaultBindingMode: bindingMode.twoWay
        })(aureliaClass);
    }
}
