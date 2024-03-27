import { from, of, Observable, mergeMap, map, zip, toArray } from 'rxjs';
import styles from './Button.module.css';
import { option } from '@components/option/Option';

// components -> container -> wrapper

export type SelectAttribute = {
    event?: Partial<GlobalEventHandlers>;
};
export type SelectStyle = {
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    animation?: 'spin';
    svg?: string;
    svgPosition?: 'top' | 'bottom' | 'left' | 'right';
};

export const select = ({ event = {} }: SelectAttribute, { size = 'inherit', animation, svg }: SelectStyle = {}, options: Observable<HTMLOptionElement[]>) => {
    let promise = new Promise<HTMLSelectElement>((res) => {
        let select = Object.assign(document.createElement('select'), {
            className: `${styles.button} ${styles[size]} ${svg && styles.svg}`,
        });
        Object.assign(select, event);

        /*if(animation) {
			button.classList.add(styles[animation]);
		}*/