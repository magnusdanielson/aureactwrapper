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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { AuReactStateWrapper } from './AuReactStateWrapper';
import { ReactStateWrapperNoChildren } from './ReactStateWrapperNoChildren';
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
        var reactElement = React.createElement(ReactStateWrapperNoChildren, a);
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
}(AuReactStateWrapper));
export { AuReactStateWrapperNoChildren };
