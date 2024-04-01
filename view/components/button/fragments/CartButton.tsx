import { Button } from '@components/button/Button';
import { ShoppingCart } from '@components/svg/ShoppingCart';
import { Subject, map } from 'rxjs';

//상점 버튼
export const cartButtonEvent = new Subject<Event>();
export const CartButton = () => {
    return (
        <Button
            textContent="준비 중"
            size="short"
            type="button"
            svg={<ShoppingCart />}
        ></Button>
    );
};
