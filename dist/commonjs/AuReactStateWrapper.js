"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var aurelia_framework_1 = require("aurelia-framework");
var ReactStateWrapper_1 = require("./ReactStateWrapper");
// Den här filen har endast "ReactStateWrapper" som unik referens
var AuReactStateWrapper = /** @class */ (function () {
    function AuReactStateWrapper(element) {
        this.element = element;
        this.log = aurelia_framework_1.LogManager.getLogger('reacthost');
        // this.log.info('DuReactWrapperBaseClass constructor');
        this.inneridAurelia = 'du' + Math.round(Math.random() * 10000000000000000);
    }
    AuReactStateWrapper.prototype.createState = function (reactprops) {
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
                    var funcNames = ['defaultOnChangeEvent', 'defaultActionEvent', 'onlyAureliaBound'];
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
    AuReactStateWrapper.prototype.isHidden = function () {
        return this.hiddenIsHidden ? this[this.hiddenName] : !this[this.hiddenName];
    };
    AuReactStateWrapper.prototype.bind = function (bindingContext) {
        //this.log.debug('DuPanel bind');
        if (bindingContext !== null) {
            this.parent = bindingContext;
        }
    };
    AuReactStateWrapper.prototype.unbind = function () {
        //this.log.debug('DuReactWrapperBaseClass unbind ')
        ReactDom.unmountComponentAtNode(this.element);
    };
    AuReactStateWrapper.prototype.propertyChanged = function (name, newValue) {
        //this.log.debug('propertyChanged');
        //this.log.debug(name);
        //this.log.debug(newValue);
        //console.log(this);
        var obj = {};
        obj[name] = newValue;
        if (name == this.hiddenName) {
            if (this.hiddenIsHidden ? newValue : !newValue) {
                this.moveBack();
            }
        }
        this.reactComponent.setState(obj);
        this[name] = newValue;
    };
    AuReactStateWrapper.prototype.moveBack = function () {
        //this.log.debug('Move back');
        var auelement = document.getElementById(this.inneridAurelia);
        var oldParent = document.getElementById(this.reactComponent.inneridReact);
        if (oldParent == null || auelement == null) {
            return;
        }
        while (oldParent.childNodes.length > 0) {
            auelement.appendChild(oldParent.childNodes[0]);
        }
    };
    AuReactStateWrapper.prototype.reactComponentWillUnmount = function () {
        //this.log.debug('DuReactWrapperBaseClass componentWillUnmount');
    };
    AuReactStateWrapper.prototype.reactComponentDidMount = function () {
        //this.log.debug('DuReactWrapperBaseClass reactComponentDidMount');
    };
    AuReactStateWrapper.prototype.renderReact = function (reactClass, a) {
        //this.log.debug('DuReactWrapperBaseClass renderReact');
        ReactDom.unmountComponentAtNode(this.element);
        this.container = this.element.querySelector('.au-react-root');
        if (this.container != null) {
            this.container.remove();
        }
        this.container = document.createElement('span');
        this.container.setAttribute('class', 'au-react-root');
        this.element.appendChild(this.container);
        a.aureliaHost = this;
        a.reactClass = reactClass;
        // reactElement is the DOM element;
        var reactElement = React.createElement(ReactStateWrapper_1.ReactStateWrapper, a);
        // reactComponent is THE React Component
        var reactComponent = ReactDom.render(reactElement, this.container
        // , () =>
        // {
        //   this.log.debug('DuReactWrapperBaseClass React callback render complete');
        // }
        );
        this.reactComponent = reactComponent;
        //this.log.debug('DuReactWrapperBaseClass renderReact complete');
    };
    AuReactStateWrapper = __decorate([
        aurelia_framework_1.inlineView('<template><span id.bind="inneridAurelia" show.bind="!hidden"><slot></slot></span></template>')
    ], AuReactStateWrapper);
    return AuReactStateWrapper;
}());
exports.AuReactStateWrapper = AuReactStateWrapper;
