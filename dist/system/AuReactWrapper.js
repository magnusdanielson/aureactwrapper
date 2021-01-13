System.register(["react", "react-dom", "aurelia-framework", "./ReactWrapper", "./AuReactWrapperBase"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var React, ReactDom, aurelia_framework_1, ReactWrapper_1, AuReactWrapperBase_1, AuReactWrapper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (React_1) {
                React = React_1;
            },
            function (ReactDom_1) {
                ReactDom = ReactDom_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ReactWrapper_1_1) {
                ReactWrapper_1 = ReactWrapper_1_1;
            },
            function (AuReactWrapperBase_1_1) {
                AuReactWrapperBase_1 = AuReactWrapperBase_1_1;
            }
        ],
        execute: function () {
            AuReactWrapper = /** @class */ (function (_super) {
                __extends(AuReactWrapper, _super);
                function AuReactWrapper(element, tq) {
                    var _this = _super.call(this, element, tq) || this;
                    _this.tq = tq;
                    //console.log("ctor AuReactWrapper")
                    _this.element = element;
                    _this.log = aurelia_framework_1.LogManager.getLogger('reacthost');
                    // this.log.info('DuReactWrapperBaseClass constructor');
                    _this.inneridAurelia = 'du' + Math.round(Math.random() * 10000000000000000);
                    return _this;
                }
                AuReactWrapper.prototype.unbind = function () {
                    if (this.element != null)
                        ReactDom.unmountComponentAtNode(this.container);
                };
                AuReactWrapper.prototype.propertyChanged = function (name, newValue) {
                    // console.log('AuReactWrapper: propertyChanged');
                    // console.log(this);
                    var _this = this;
                    // console.log(`property ${name} changed to ${newValue}`);
                    if (name == this.hiddenName) {
                        if (this.isHidden()) {
                            this.moveBack();
                        }
                    }
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
                    return;
                    // if (name == this.hiddenName)
                    // {
                    //   if ( this.hiddenIsHidden ? newValue : !newValue )
                    //   {
                    //     this.moveBack();
                    //   }
                    // }
                    // console.log(this);
                    // //@ts-ignore
                    // if(this.changeState == false)
                    // {
                    //   console.log("AuReactWrapper changeState == false");
                    // }
                    // else
                    // {
                    //   console.log("AuReactWrapper changeState == true");
                    //   //this.reactComponent.setState(obj);
                    //   //this[name] = newValue;
                    // }
                    // this.reactComponent.setState(obj);
                    // //@ts-ignore
                    // this.changeState = true;
                };
                AuReactWrapper.prototype.moveBack = function () {
                    //console.log('moveBack AuReactWrapper');
                    var auelement = document.getElementById(this.inneridAurelia);
                    var oldParent = document.getElementById(this.reactComponent.inneridReact);
                    if (oldParent == null || auelement == null) {
                        return;
                    }
                    while (oldParent.childNodes.length > 0) {
                        auelement.appendChild(oldParent.childNodes[0]);
                    }
                };
                AuReactWrapper.prototype.renderReact = function (reactClass, a) {
                    //console.log('renderReact AuReactWrapper');
                    //ReactDom.unmountComponentAtNode(this.element);
                    this.container = this.element.querySelector('.au-react-root');
                    // if (this.container != null) {
                    //   this.container.remove();
                    // }
                    // this.container = document.createElement('span');
                    // this.container.setAttribute('class', 'au-react-root');
                    // this.element.appendChild(this.container);
                    if (this.container == null) {
                        this.container = document.createElement('span');
                        this.container.setAttribute('class', 'au-react-root');
                        this.element.appendChild(this.container);
                    }
                    a.aureliaHost = this;
                    a.reactClass = reactClass;
                    // reactElement is the DOM element;
                    var reactElement = React.createElement(ReactWrapper_1.ReactWrapper, a);
                    // reactComponent is THE React Component
                    var reactComponent = ReactDom.render(reactElement, this.container
                    // , () =>
                    // {
                    //   console.log('DuReactWrapperBaseClass React callback render complete');
                    // }
                    );
                    this.reactComponent = reactComponent;
                    //console.log('renderReact complete AuReactWrapper');
                };
                AuReactWrapper = __decorate([
                    aurelia_framework_1.inlineView('<template><span id.bind="inneridAurelia" show.bind="!hidden"><slot></slot></span></template>')
                ], AuReactWrapper);
                return AuReactWrapper;
            }(AuReactWrapperBase_1.AuReactWrapperBase));
            exports_1("AuReactWrapper", AuReactWrapper);
        }
    };
});
