import { from, of, Observable } from 'rxjs';
import styles from './Anchor.module.css';
import { HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from 'react';

export type AnchorAttribute = {
    hrefType?:
        | 'mailto:'
        | 'tel:+'
        | 'http'
        | 'https'
        | 'blob'
        | 'data'
        | '#'
        | '/'
        | '';
    href?: string;
    download?: string;
    ping?: string;
    referrerpolicy?: HTMLAttributeReferrerPolicy;
    rel?: string;
    /**
     * 참고: target을 사용할 때,
     * rel="noreferrer"를 추가해
     * window.opener API의 악의적인 사용을 방지하는걸 고려하세요
     */
    target?: HTMLAttributeAnchorTarget;
    event?: Partial<GlobalEventHandlers>;
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    type?: 'standard';
    svg?: string;
    textContent?: string;
};
export const Anchor = ({
    hrefType,
    href,
    download,
    ping,
    referrerpolicy,
    rel,
    target,
    event,
    size,
    type,
    textContent,
}: AnchorAttribute = {}) => {
    return (
        <a
            className={styles.link}
            hrefLang={hrefType}
            href={href}
            download={download}
            ping={ping}
            referrerPolicy={referrerpolicy}
            rel={rel}
            target={target}
        >
            {textContent}
        </a>
    );
};
