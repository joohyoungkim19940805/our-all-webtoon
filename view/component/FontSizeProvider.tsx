import { windowResize } from '@handler/globalEvents';
import { useLayoutEffect } from 'react';
const covertFontSize = async (html: HTMLElement) => {
    return new Promise<undefined | number>(resolve => {
        let lastFontSizeResult: undefined | number = undefined;
        for (let i = 100, len = window.innerWidth + 100; i < len; i += 100) {
            if (window.innerWidth <= i) {
                lastFontSizeResult = Math.max(
                    10,
                    25 / (window.innerWidth / (i * 0.5))
                );
                html.style.fontSize = lastFontSizeResult + 'px';
            }
        }
        resolve(lastFontSizeResult);
    });
};
const ConvertFontSize = () => {
    useLayoutEffect(() => {
        if (!document.body.parentElement) return;
        covertFontSize(document.body.parentElement);
        windowResize.subscribe(() => {
            if (!document.body.parentElement) return;
            covertFontSize(document.body.parentElement);
        });
    });
    return null;
};
export default ConvertFontSize;
