import { Logger } from 'aurelia-logging';
import { IAuReactWrapper } from './IAuReactWrapper';
export declare abstract class AuReactNoStateWrapper implements IAuReactWrapper {
    element: HTMLElement;
    reactComponent: any;
    parent: any;
    log: Logger;
    constructor(element: any);
    abstract render(): any;
    bind(bindingContext: any): void;
    unbind(): void;
    createState(reactprops: any): any;
}
