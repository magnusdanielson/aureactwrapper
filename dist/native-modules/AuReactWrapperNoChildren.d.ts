import { TaskQueue } from 'aurelia-framework';
import { AuReactWrapperBase } from './AuReactWrapperBase';
export declare class AuReactWrapperNoChildren extends AuReactWrapperBase {
    protected tq: TaskQueue;
    constructor(element: any, tq: TaskQueue);
}
