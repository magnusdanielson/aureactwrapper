"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuReactWrapperBase = void 0;
var React = require("react");
var ReactDom = require("react-dom");
var aurelia_framework_1 = require("aurelia-framework");
var ReactSimpleWrapper_1 = require("./ReactSimpleWrapper");
var AuReactWrapperBase = /** @class */ (function () {
    function AuReactWrapperBase(element, tq) {
        this.tq = tq;
        this.ignoreReactUpdate = false;
        this.hiddenName = 'hidden';
        this.hiddenIsHidden = true;
        this.element = element;
        this.log = aurelia_framework_1.LogManager.getLogger('reacthost');
    }
    AuReactWrapperBase.prototype.createState = function (reactprops) {
        var reactpropNames = Object.getOwnPropertyNames(reactprops);
        var a = {};
        var _loop_1 = function (i) {
            var renderPropName = reactpropNames[i];
            if (typeof reactprops[renderPropName] === 'function') {
                //console.log(`React template: typeof reactprops[${renderPropName}] is function`);
                //console.log(`Aurelia object: typeof this[${renderPropName}] is ${typeof this[renderPropName] }`);
                if (typeof this_1[renderPropName] === 'function') {
                    //console.log('bound function, go aurelia');
                    a[renderPropName] = this_1[renderPropName].bind(this_1.parent);
                }
                else {
                    //console.log('function is not bound, check for default implementation on React template');
                    var funcNames = ['defaultOnChangeEvent', 'defaultActionEvent', 'onlyAureliaBound'];
                    if (!funcNames.includes(reactprops[renderPropName].name)) {
                        //console.log('React template has default implementation, call it.');
                        that = this_1;
                        a[renderPropName] = function () {
                            var argLength = arguments.length;
                            reactprops[renderPropName](that, argLength >= 1 ? arguments[0] : undefined, argLength >= 2 ? arguments[1] : undefined, argLength >= 3 ? arguments[2] : undefined, argLength >= 4 ? arguments[3] : undefined);
                        };
                    }
                    else {
                        //console.log('React template has empty implementation, do nothing.');
                    }
                }
            }
            else {
                //console.log(`React template: typeof reactprops[${renderPropName}] is NOT function`);
                if (typeof this_1[renderPropName] !== 'undefined') {
                    //console.log('Aurelia object property ' + renderPropName + ' has value ' +  this[renderPropName]);
                    a[renderPropName] = this_1[renderPropName];
                }
                else {
                    //console.log('Aurelia object property ' + renderPropName + ' has NO value ' );
                }
            }
        };
        var this_1 = this, that;
        for (var i = 0; i < reactpropNames.length; i++) {
            _loop_1(i);
        }
        return a;
    };
    AuReactWrapperBase.prototype.isHidden = function () {
        return this.hiddenIsHidden ? this[this.hiddenName] : !this[this.hiddenName];
    };
    AuReactWrapperBase.prototype.bind = function (bindingContext) {
        if (bindingContext !== null) {
            this.parent = bindingContext;
        }
    };
    AuReactWrapperBase.prototype.unbind = function () {
        if (this.element != null)
            ReactDom.unmountComponentAtNode(this.element);
    };
    AuReactWrapperBase.prototype.propertyChanged = function (name, newValue) {
        var _this = this;
        if (!this.ignoreReactUpdate) {
            ////console.log("update came from aurelia");
            var obj = {};
            obj[name] = newValue;
            // line below is necessery
            this.reactComponent.setState(obj);
        }
        this.tq.queueMicroTask(function () {
            _this.ignoreReactUpdate = false;
        });
    };
    AuReactWrapperBase.prototype.renderReact = function (reactClass, orignalProp) {
        orignalProp.aureliaHost = this;
        orignalProp.reactClass = reactClass;
        // reactElement is the DOM element;
        var reactElement = React.createElement(ReactSimpleWrapper_1.ReactSimpleWrapper, orignalProp, null);
        // reactComponent is THE React Component
        this.reactComponent = ReactDom.render(reactElement, this.element);
    };
    return AuReactWrapperBase;
}());
exports.AuReactWrapperBase = AuReactWrapperBase;
