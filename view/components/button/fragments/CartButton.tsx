import { Button } from '@components/button/Button';
import CartSvg from '@svg/shopping-cart.svg';
import { Subject, map } from 'rxjs';

//상점 버튼
export const cartButtonEvent = new Subject<Event>();
export const CartButton = () => {
    return (
        <Button
            textContent="준비 중"
            event={{ onclick: (event) => cartButtonEvent.next(event) }}
            size="short"
            type="button"
            svg={CartSvg}
        ></Button>
    );
};
