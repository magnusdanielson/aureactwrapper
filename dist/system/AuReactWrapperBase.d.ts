import { TaskQueue } from 'aurelia-framework';
import { Logger } from 'aurelia-logging';
import { IAuReactWrapper } from './IAuReactWrapper';
export declare abstract class AuReactWrapperBase implements IAuReactWrapper {
    protected tq: TaskQueue;
    element: HTMLElement;
    reactComponent: any;
    parent: any;
    protected log: Logger;
    ignoreReactUpdate: boolean;
    hiddenName: string;
    hiddenIsHidden: boolean;
    constructor(element: any, tq: TaskQueue);
    createState(reactprops: any): any;
    isHidden(): boolean;
    bind(bindingContext: any): void;
    unbind(): void;
    propertyChanged(name: any, newValue: any): void;
    renderReact(reactClass: any, orignalProp: any): void;
}
