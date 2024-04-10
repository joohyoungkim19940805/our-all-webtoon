import { ShoppingCart } from '@components/svg/ShoppingCart';
import { Subject, map } from 'rxjs';
import styles from './Button.module.css';

//상점 버튼
export const cartButtonEvent = new Subject<Event>();
export const CartButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            준비 중<ShoppingCart></ShoppingCart>
        </button>
    );
};
