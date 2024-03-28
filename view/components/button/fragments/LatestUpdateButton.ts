import { button } from '@components/button/Button';
import { Subject, map } from 'rxjs';
import boxSvg from '@svg/box.svg';

// 최신 업데이트 버튼
export const latestUpdateButtonEvent = new Subject<Event>();
latestUpdateButtonEvent.subscribe((e) => console.log(e));
export const latestUpdateButton = button(
    {
        textContent: '최신 업데이트',
        event: {
            onclick: (e) => latestUpdateButtonEvent.next(e),
        },
    },
    { size: 'short', svg: boxSvg },
);
