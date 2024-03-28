import { from, of, Observable } from 'rxjs';
import styles from './Button.module.css';
import boxSvg from '@svg/box.svg';
import { ReactElement, ReactNode } from 'react';

// components -> container -> wrapper

export type ButtonAttributeProps = {
    type?: 'button' | 'submit';
    textContent?: string;
    event?: Partial<GlobalEventHandlers>;
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    animation?: 'spin';
    svg?: ReactNode | ReactElement;
    svgPosition?: 'top' | 'bottom' | 'left' | 'right';
    children?: ReactNode[] | ReactElement[];
};

export type ButtonStyle = {};

type SvgPosition = 'svg_top' | 'svg_bottom' | 'svg_left' | 'svg_right';

export const Button = ({
    type = 'button',
    textContent,
    event = {},
    size = 'inherit',
    animation,
    svg: Svg,
    svgPosition = 'top',
}: ButtonAttributeProps) => {
    return (
        <button
            className={`${styles.button} ${styles[size]} ${Svg && `${styles.svg} ${styles[`svg_${svgPosition}` as SvgPosition]}`}`}
            type={type}
            {...Object.entries(event)}
        >
            {textContent}
            {Svg && Svg}
        </button>
    );
};

export const close = () => {};

export type ButtonAttribute = {
    type?: 'button' | 'submit';
    textContent?: string;
    event?: Partial<GlobalEventHandlers>;
};
export type ButtonStyle2 = {
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    animation?: 'spin';
    svg?: string;
    svgPosition?: 'top' | 'bottom' | 'left' | 'right';
};
type SvgPosition2 = 'svg_top' | 'svg_bottom' | 'svg_left' | 'svg_right';
export const button = (
    { type = 'button', textContent, event = {} }: ButtonAttribute,
    {
        size = 'inherit',
        animation,
        svg,
        svgPosition = 'top',
    }: ButtonStyle2 = {},
) => {
    let promise = new Promise<HTMLButtonElement>((res) => {
        let button = Object.assign(document.createElement('button'), {
            className: `${styles.button} ${styles[size]} ${svg && styles.svg}`,
            type,
            innerHTML: svg || '',
        });
        button.append(document.createTextNode(textContent || ''));
        Object.assign(button, event);

        if (svg)
            button.classList.add(styles[`svg_${svgPosition}` as SvgPosition2]);

        /*if(animation) {
			button.classList.add(styles[animation]);
		}*/
        res(button);
    });
    return from(promise);
};
