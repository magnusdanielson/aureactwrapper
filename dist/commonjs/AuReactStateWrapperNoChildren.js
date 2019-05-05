"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var AuReactStateWrapper_1 = require("./AuReactStateWrapper");
var ReactStateWrapperNoChildren_1 = require("./ReactStateWrapperNoChildren");
// Den här filen har endast "ReactStateWrapper" som unik referens
var AuReactStateWrapperNoChildren = /** @class */ (function (_super) {
    __extends(AuReactStateWrapperNoChildren, _super);
    function AuReactStateWrapperNoChildren() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuReactStateWrapperNoChildren.prototype.renderReact = function (reactClass, a) {
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
        var reactElement = React.createElement(ReactStateWrapperNoChildren_1.ReactStateWrapperNoChildren, a);
        // reactComponent is THE React Component
        var reactComponent = ReactDom.render(reactElement, this.container
        // , () =>
        // {
        //   this.log.debug('DuReactWrapperBaseClass React callback render complete');
        // }
        );
        this.reactComponent = reactComponent;
    };
    return AuReactStateWrapperNoChildren;
}(AuReactStateWrapper_1.AuReactStateWrapper));
exports.AuReactStateWrapperNoChildren = AuReactStateWrapperNoChildren;
