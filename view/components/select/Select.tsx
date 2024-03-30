import { from, of, Observable, mergeMap, map, zip, toArray } from 'rxjs';
import styles from './Button.module.css';
import { Option } from '@components/option/Option';

// components -> container -> wrapper

export type SelectAttributeProps = {
    event?: Partial<GlobalEventHandlers>;
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    animation?: 'spin';
    svg?: string;
    svgPosition?: 'top' | 'bottom' | 'left' | 'right';
};
export type SelectStyle = {};
export const Select = () => {
    return <select></select>;
};
/*
export const select = (
    { event = {} }: SelectAttribute,
    { size = 'inherit', animation, svg }: SelectStyle = {},
    options: Observable<HTMLOptionElement[]>,
) => {
    let promise = new Promise<HTMLSelectElement>((res) => {
        let select = Object.assign(document.createElement('select'), {
            className: `${styles.button} ${styles[size]} ${svg && styles.svg}`,
        });
        Object.assign(select, event);

        options.subscribe((options) => {
            select.replaceChildren(...options);
        });
        res(select);
    });
    return from(promise);
};
let t = zip(option({}, {}), option({}, {})).pipe(
    mergeMap((e) => e),
    toArray(),
    map((e) => {
        console.log(e);
        return e;
    }),
);
console.log(t);
select({}, {}, zip(option({}, {})));
*/
