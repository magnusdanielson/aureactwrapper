import * as React from 'react';
import { ReactSimpleWrapper } from './ReactSimpleWrapper';

export class ReactWrapper extends ReactSimpleWrapper {
    inneridReact: string;

    constructor(props: any) {
        super(props);
        this.state = {...props};
        this.inneridReact = 'du' + Math.round( Math.random() * 10000000000000000);
    }

    //@ts-ignore
    render() {
        //console.log("ReactWrapper: render");
        if (this.aureliaHost.isHidden()) {
            // below just to please the ts compiler
            //var empty = React.createElement('',null,null);
            //return empty;
            return null;
        }

        var innerReactComponent = React.createElement(
            this.reactClass,
            this.state,
            React.createElement('span', {
                id: this.inneridReact,
                ref: (newParent: HTMLElement | null) => {
                    if (newParent == null) 
                    {
                      newParent = document.getElementById(this.inneridReact.toString());
                      if (newParent == null)
                      {
                        return;
                      }
                    }

                    if (this.aureliaHost.isHidden()) {
                        return;
                    }

                    let auelement = document.getElementById(
                        this.aureliaHost.inneridAurelia
                    );

                    if (auelement == null) {
                        return;
                    }

                    while (auelement.childNodes.length > 0) {
                        newParent.appendChild(auelement.childNodes[0]);
                    }
                }
            })
        );
        return innerReactComponent;
    }
}
