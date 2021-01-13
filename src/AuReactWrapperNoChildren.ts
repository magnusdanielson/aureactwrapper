import {TaskQueue, noView } from 'aurelia-framework';
import { AuReactWrapperBase } from './AuReactWrapperBase';

@noView()
export class AuReactWrapperNoChildren extends AuReactWrapperBase
{
  constructor(element, protected tq: TaskQueue) 
  {
    super(element, tq);
  }
}

