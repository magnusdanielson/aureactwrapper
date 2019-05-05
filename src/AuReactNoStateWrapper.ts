import * as ReactDom from 'react-dom';
import { LogManager } from 'aurelia-framework';
import { Logger } from 'aurelia-logging';
import { IAuReactWrapper } from './IAuReactWrapper';

export abstract class AuReactNoStateWrapper  implements IAuReactWrapper
{
    public element: HTMLElement;
    public reactComponent;
    public parent: any;
    public log: Logger;

    constructor(element) {
        this.element = element;
        this.log = LogManager.getLogger('reacthost');
    }

    public abstract render();

    public bind(bindingContext) {
        if (bindingContext !== null) {
            this.parent = bindingContext;
        }
        this.render();
    }

    public unbind() {
        ReactDom.unmountComponentAtNode(this.element);
    }

    public createState(reactprops: any): any {
        var reactpropNames = Object.getOwnPropertyNames(reactprops);

        var a = {};
        for (let i = 0; i < reactpropNames.length; i++) {
            let renderPropName = reactpropNames[i];
            if (typeof reactprops[renderPropName] === 'function') {
                //this.log.debug('typeof reactprops[renderPropName] ' + renderPropName + ' is function');

                // function is aurelia bound, make sure to call it
                //this.log.debug('typeof this[renderPropName] = ' + typeof this[renderPropName] );
                if (typeof this[renderPropName] === 'function') {
                    a[renderPropName] = (...newValue: any[]) => {
                        //this.log.debug('bound function, go aurelia');
                        return this[renderPropName](newValue);
                    };
                } else {
                    let funcNames = [
                        'defaultOnChangeEvent',
                        'defaultActionEvent',
                        'onlyAureliaBound'
                    ];
                    if (!funcNames.includes(reactprops[renderPropName].name)) {
                        a[renderPropName] = (...newValue: any[]) => {
                            //this.log.debug('run func from reactprops');
                            return reactprops[renderPropName](this, newValue);
                        };
                    }
                }
            } else {
                if (typeof this[renderPropName] !== 'undefined') {
                    //this.log.debug('adding ' + renderPropName + ' with value ' +  this[renderPropName]);
                    a[renderPropName] = this[renderPropName];
                }
            }
        }
        return a;
    }
}