import * as React from 'react';
import { ReactStateWrapper } from './ReactStateWrapper';

/*
* @deprecated Use ReactSimpleWrapper instead
*/
export class ReactStateWrapperNoChildren extends ReactStateWrapper {
    render() {
        if (this.aureliaHost.isHidden()) {
            return null;
        }

        let com = React.createElement(
            this.reactClass,
            this.state);
        return com;
    }
}
