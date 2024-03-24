declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.svg' {
    const content: string
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