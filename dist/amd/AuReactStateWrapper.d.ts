import { Logger } from 'aurelia-logging';
import { IAuReactWrapper } from './IAuReactWrapper';
export declare class AuReactStateWrapper implements IAuReactWrapper {
    element: HTMLElement;
    container: HTMLElement | null;
    reactComponent: any;
    inneridAurelia: string;
    parent: any;
    log: Logger;
    hiddenName: string;
    hiddenIsHidden: boolean;
    createState(reactprops: any): any;
    isHidden(): boolean;
    constructor(element: any);
    bind(bindingContext: any): void;
    unbind(): void;
    propertyChanged(name: any, newValue: any): void;
    moveBack(): void;
    renderReact(reactClass: any, a: any): void;
}
