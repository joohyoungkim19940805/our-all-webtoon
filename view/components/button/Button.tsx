import { from, of, Observable } from 'rxjs';
import styles from './Button.module.css';
import boxSvg from '@svg/box.svg';
import { ReactElement, ReactNode } from 'react';

// components -> container -> wrapper

export type ButtonAttributeProps = {
    type?: 'button' | 'submit';
    textContent?: string;
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    animation?: 'spin';
    svg?: ReactNode | ReactElement;
    svgPosition?: 'top' | 'bottom' | 'left' | 'right';
    children?: ReactNode[] | ReactElement[];
    event?: Partial<GlobalEventHandlers>;
};

type SvgPosition = 'svg_top' | 'svg_bottom' | 'svg_left' | 'svg_right';

export const Button = ({
    type = 'button',
    textContent,
    event = {},
    size = 'inherit',
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
