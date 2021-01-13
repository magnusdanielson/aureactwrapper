import { TaskQueue } from 'aurelia-framework';
import { Logger } from 'aurelia-logging';
import { AuReactWrapperBase } from './AuReactWrapperBase';
export declare class AuReactWrapper extends AuReactWrapperBase {
    protected tq: TaskQueue;
    element: HTMLElement;
    container: Element | null;
    reactComponent: any;
    inneridAurelia: string;
    parent: any;
    log: Logger;
    constructor(element: any, tq: TaskQueue);
    unbind(): void;
    propertyChanged(name: any, newValue: any): void;
    moveBack(): void;
    renderReact(reactClass: any, a: any): void;
}
