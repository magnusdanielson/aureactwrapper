import * as React from 'react';
export declare class ReactSimpleWrapper extends React.Component {
    reactClass: any;
    aureliaHost: any;
    constructor(props: any);
    componentWillUnmount(): void;
    componentDidMount(): void;
    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | null;
}
