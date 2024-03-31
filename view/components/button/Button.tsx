import { from, of, Observable } from 'rxjs';
import styles from './Button.module.css';
import boxSvg from '@svg/box.svg';
import React, {
    ReactElement,
    ReactNode,
    EventHandler,
    JSXElementConstructor,
} from 'react';

// components -> container -> wrapper

export type ButtonAttributeProps = {
    type?: 'button' | 'submit';
    textContent?: string;
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    animation?: 'spin';
    svg?: ReactNode | ReactElement;
    svgPosition?: 'top' | 'bottom' | 'left' | 'right';
    children?:
        | ReactNode[]
        | ReactElement<any, string | JSXElementConstructor<any>>[];
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // 클릭 이벤트 핸들러
    onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>; // 더블클릭 이벤트 핸들러
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>; // 마우스 엔터 이벤트 핸들러
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>; // 마우스 리브 이벤트 핸들러
};

type SvgPosition = 'svg_top' | 'svg_bottom' | 'svg_left' | 'svg_right';

export const Button = ({
    type = 'button',
    textContent,
    size = 'inherit',
    svg: Svg,
    svgPosition = 'top',
    onClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
}: ButtonAttributeProps) => {
    return (
        <button
            className={`${styles.button} ${styles[size]} ${Svg && `${styles.svg} ${styles[`svg_${svgPosition}` as SvgPosition]}`}`}
            type={type}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {textContent}
            {Svg && Svg}
        </button>
    );
};
