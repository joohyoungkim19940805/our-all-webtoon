declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
/*
declare global {
    interface Window {
        dataLayer: string[]
        [key: string]: Array<DefaultParam>
    }
}
*/