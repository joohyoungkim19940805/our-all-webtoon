import { from, of, Observable } from 'rxjs';
import styles from './Button.module.css';

export type OptionAttribute = {
    textContent?: string;
    value?: string | number;
    id?: string;
    event?: Partial<GlobalEventHandlers>;
};
export type OptionStyle = {
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    animation?: 'spin';
};

export const option = ({ textContent, value, event = {} }: OptionAttribute, { size = 'inherit' }: OptionStyle = {}) => {
    let promise = new Promise<HTMLOptionElement>((res) => {
        let option = Object.assign(document.createElement('option'), {
            className: `${styles.button} ${styles[size]}`,
            textContent,
            value,
        });
        Object.assign(option, event);
        /*if(animation) {
			button.classList.add(styles[animation]);
		}*/
        res(option);
    });
    return from(promise);
};
