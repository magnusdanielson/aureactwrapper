define(["require", "exports", "react-dom", "aurelia-framework"], function (require, exports, ReactDom, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuReactNoStateWrapper = /** @class */ (function () {
        function AuReactNoStateWrapper(element) {
            this.element = element;
            this.log = aurelia_framework_1.LogManager.getLogger('reacthost');
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
                    this_1.log.debug("React template: typeof reactprops[" + renderPropName + "] is function");
                    this_1.log.debug("Aurelia object: typeof this[" + renderPropName + "] is " + typeof this_1[renderPropName]);
                    if (typeof this_1[renderPropName] === 'function') {
                        this_1.log.debug('bound function, go aurelia');
                        a[renderPropName] = this_1[renderPropName].bind(this_1.parent);
                    }
                    else {
                        this_1.log.debug('function is not bound, check for default implementation on React template');
                        var funcNames = [
                            'defaultOnChangeEvent',
                            'defaultActionEvent',
                            'onlyAureliaBound'
                        ];
                        if (!funcNames.includes(reactprops[renderPropName].name)) {
                            this_1.log.debug('React template has default implementation, call it.');
                            that = this_1;
                            a[renderPropName] = function () {
                                var argLength = arguments.length;
                                reactprops[renderPropName](that, argLength >= 1 ? arguments[0] : undefined, argLength >= 2 ? arguments[1] : undefined, argLength >= 3 ? arguments[2] : undefined, argLength >= 4 ? arguments[3] : undefined);
                            };
                        }
                        else {
                            this_1.log.debug('React template has empty implementation, do nothing.');
                        }
                    }
                }
                else {
                    this_1.log.debug("React template: typeof reactprops[" + renderPropName + "] is NOT function");
                    if (typeof this_1[renderPropName] !== 'undefined') {
                        this_1.log.debug('Aurelia object property ' + renderPropName + ' has value ' + this_1[renderPropName]);
                        a[renderPropName] = this_1[renderPropName];
                    }
                    else {
                        this_1.log.debug('Aurelia object property ' + renderPropName + ' has NO value ');
                    }
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
    exports.AuReactNoStateWrapper = AuReactNoStateWrapper;
});
