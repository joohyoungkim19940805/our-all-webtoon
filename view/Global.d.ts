declare global {
    namespace JSX {
        interface IntrinsicElements {
            'flex-layout': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            'flex-container': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            'flex-resizer': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.svg' {
    const content: ReactNode | ReactElement;
    export default content;
}
declare module '*.png';
declare module '*.jpg';
/*
declare module '*.jpg' {
    const value: any;
    export default value;
}
declare module '*.png' {
    const value: any;
    export default value;
}
*/
/*
declare global {
    interface Window {
        dataLayer: string[]
        [key: string]: Array<DefaultParam>
    }
}
*/
