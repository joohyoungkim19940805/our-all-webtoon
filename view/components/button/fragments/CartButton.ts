import { button } from '@components/button/Button';
import cartSvg from '@svg/shopping-cart.svg';
import { Subject, map } from 'rxjs';

//상점 버튼
export const cartButtonEvent = new Subject<Event>();
export const cartButton = button(
    {
        textContent: '준비 중',
        event: { onclick: (event) => cartButtonEvent.next(event) },
    },
    { size: 'short', svg: cartSvg },
);
