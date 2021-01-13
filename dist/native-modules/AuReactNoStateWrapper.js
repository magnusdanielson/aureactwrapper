import * as ReactDom from 'react-dom';
import { LogManager } from 'aurelia-framework';
/*
* @deprecated Use AuReactWrapperBase instead
*/
var AuReactNoStateWrapper = /** @class */ (function () {
    function AuReactNoStateWrapper(element) {
        this.element = element;
        this.log = LogManager.getLogger('reacthost');
    }
    AuReactNoStateWrapper.prototype.bind = function (bindingContext) {
        if (bindingContext !== null) {
            this.parent = bindingContext;
        }
        this.render();
    };
    AuReactNoStateWrapper.prototype.unbind = function () {
        ReactDom.unmountComponentAtNode(this.element);
    };
    AuReactNoStateWrapper.prototype.createState = function (reactprops) {
        var reactpropNames = Object.getOwnPropertyNames(reactprops);
        var a = {};
        var _loop_1 = function (i) {
            var renderPropName = reactpropNames[i];
            if (typeof reactprops[renderPropName] === 'function') {
                //this.log.debug(`React template: typeof reactprops[${renderPropName}] is function`);
                //this.log.debug(`Aurelia object: typeof this[${renderPropName}] is ${typeof this[renderPropName]}`);
                if (typeof this_1[renderPropName] === 'function') {
                    //this.log.debug('bound function, go aurelia');
                    a[renderPropName] = this_1[renderPropName].bind(this_1.parent);
                }
                else {
                    //this.log.debug('function is not bound, check for default implementation on React template');
                    var funcNames = [
                        'defaultOnChangeEvent',
                        'defaultActionEvent',
                        'onlyAureliaBound'
                    ];
                    if (!funcNames.includes(reactprops[renderPropName].name)) {
                        //this.log.debug('React template has default implementation, call it.');
                        that = this_1;
                        a[renderPropName] = function () {
                            var argLength = arguments.length;
                            reactprops[renderPropName](that, argLength >= 1 ? arguments[0] : undefined, argLength >= 2 ? arguments[1] : undefined, argLength >= 3 ? arguments[2] : undefined, argLength >= 4 ? arguments[3] : undefined);
                        };
                    }
                    // else {
                    //     this.log.debug('React template has empty implementation, do nothing.');
                    // }
                }
            }
            else {
                //this.log.debug(`React template: typeof reactprops[${renderPropName}] is NOT function`);
                if (typeof this_1[renderPropName] !== 'undefined') {
                    //this.log.debug('Aurelia object property ' + renderPropName + ' has value ' + this[renderPropName]);
                    a[renderPropName] = this_1[renderPropName];
                }
                // else {
                //     this.log.debug('Aurelia object property ' + renderPropName + ' has NO value ');
                // }
            }
        };
        var this_1 = this, that;
        for (var i = 0; i < reactpropNames.length; i++) {
            _loop_1(i);
        }
        return a;
    };
    return AuReactNoStateWrapper;
}());
export { AuReactNoStateWrapper };
