import * as ReactDom from 'react-dom';
import { LogManager } from 'aurelia-framework';
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
        var _this = this;
        var reactpropNames = Object.getOwnPropertyNames(reactprops);
        var a = {};
        var _loop_1 = function (i) {
            var renderPropName = reactpropNames[i];
            if (typeof reactprops[renderPropName] === 'function') {
                //this.log.debug('typeof reactprops[renderPropName] ' + renderPropName + ' is function');
                // function is aurelia bound, make sure to call it
                //this.log.debug('typeof this[renderPropName] = ' + typeof this[renderPropName] );
                if (typeof this_1[renderPropName] === 'function') {
                    a[renderPropName] = function () {
                        var newValue = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            newValue[_i] = arguments[_i];
                        }
                        //this.log.debug('bound function, go aurelia');
                        return _this[renderPropName](newValue);
                    };
                }
                else {
                    var funcNames = [
                        'defaultOnChangeEvent',
                        'defaultActionEvent',
                        'onlyAureliaBound'
                    ];
                    if (!funcNames.includes(reactprops[renderPropName].name)) {
                        a[renderPropName] = function () {
                            var newValue = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                newValue[_i] = arguments[_i];
                            }
                            //this.log.debug('run func from reactprops');
                            return reactprops[renderPropName](_this, newValue);
                        };
                    }
                }
            }
            else {
                if (typeof this_1[renderPropName] !== 'undefined') {
                    //this.log.debug('adding ' + renderPropName + ' with value ' +  this[renderPropName]);
                    a[renderPropName] = this_1[renderPropName];
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < reactpropNames.length; i++) {
            _loop_1(i);
        }
        return a;
    };
    return AuReactNoStateWrapper;
}());
export { AuReactNoStateWrapper };
