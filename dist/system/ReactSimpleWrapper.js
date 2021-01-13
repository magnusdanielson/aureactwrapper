System.register(["react"], function (exports_1, context_1) {
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
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var React, ReactSimpleWrapper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (React_1) {
                React = React_1;
            }
        ],
        execute: function () {
            ReactSimpleWrapper = /** @class */ (function (_super) {
                __extends(ReactSimpleWrapper, _super);
                function ReactSimpleWrapper(props) {
                    var _this = _super.call(this, props) || this;
                    _this.state = __assign({}, props);
                    _this.reactClass = props.reactClass;
                    _this.aureliaHost = props.aureliaHost;
                    return _this;
                }
                ReactSimpleWrapper.prototype.componentWillUnmount = function () {
                    if (typeof this.aureliaHost.reactComponentWillUnmount === 'function') {
                        this.aureliaHost.reactComponentWillUnmount();
                    }
                };
                ReactSimpleWrapper.prototype.componentDidMount = function () {
                    if (typeof this.aureliaHost.reactComponentDidMount === 'function') {
                        this.aureliaHost.reactComponentDidMount();
                    }
                };
                ReactSimpleWrapper.prototype.render = function () {
                    if (this.aureliaHost.isHidden()) {
                        return null;
                    }
                    return React.createElement(this.reactClass, this.state);
                };
                return ReactSimpleWrapper;
            }(React.Component));
            exports_1("ReactSimpleWrapper", ReactSimpleWrapper);
        }
    };
});
