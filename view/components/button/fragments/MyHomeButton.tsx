import { Subject, map } from 'rxjs';
import UserlaneSvg from '@svg/userlane.svg';
import { Button } from '@components/button/Button';
// 마이페이지 버튼
export const myHomeButtonEvent = new Subject<Event>();
export const MyHomeButton = () => {
    return (
        <Button
            textContent="MY"
            event={{ onclick: (event) => myHomeButtonEvent.next(event) }}
            size="short"
            svg={UserlaneSvg}
        ></Button>
    );
};
