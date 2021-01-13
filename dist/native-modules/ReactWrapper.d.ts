import * as React from 'react';
import { ReactSimpleWrapper } from './ReactSimpleWrapper';
export declare class ReactWrapper extends ReactSimpleWrapper {
    inneridReact: string;
    constructor(props: any);
    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | null;
}
