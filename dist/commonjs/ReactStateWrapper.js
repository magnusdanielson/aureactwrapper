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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactStateWrapper = void 0;
var React = require("react");
/*
* @deprecated Use ReactWrapper instead
*/
var ReactStateWrapper = /** @class */ (function (_super) {
    __extends(ReactStateWrapper, _super);
    function ReactStateWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.state = __assign({}, props);
        _this.inneridReact = 'du' + Math.round(Math.random() * 10000000000000000);
        _this.aureliaHost = props.aureliaHost;
        _this.reactClass = props.reactClass;
        return _this;
    }
    ReactStateWrapper.prototype.componentWillUnmount = function () {
        if (typeof this.aureliaHost.reactComponentWillUnmount === 'function') {
            this.aureliaHost.reactComponentWillUnmount();
        }
    };
    ReactStateWrapper.prototype.componentDidMount = function () {
        if (typeof this.aureliaHost.reactComponentDidMount === 'function') {
            this.aureliaHost.reactComponentDidMount();
        }
    };
    ReactStateWrapper.prototype.render = function () {
        var _this = this;
        if (this.aureliaHost.isHidden()) {
            return null;
        }
        var com = React.createElement(this.reactClass, this.state, React.createElement('span', {
            id: this.inneridReact,
            ref: function (newParent) {
                if (newParent == null) {
                    newParent = document.getElementById(_this.inneridReact.toString());
                    if (newParent == null) {
                        return;
                    }
                }
                if (_this.aureliaHost.isHidden()) {
                    return;
                }
                var auelement = document.getElementById(_this.aureliaHost.inneridAurelia);
                if (auelement == null) {
                    return;
                }
                while (auelement.childNodes.length > 0) {
                    newParent.appendChild(auelement.childNodes[0]);
                }
            }
        }));
        return com;
    };
    return ReactStateWrapper;
}(React.Component));
exports.ReactStateWrapper = ReactStateWrapper;
