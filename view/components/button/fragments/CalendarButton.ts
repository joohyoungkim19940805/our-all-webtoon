import { button } from '@components/button/Button';
import { Subject, map } from 'rxjs';

import calendarSvg from '@svg/calendar.svg';

//연재 일정 버튼
export const calendarButtonEvent = new Subject<Event>();
export const calendarButton = button(
    {
        textContent: '연재 일정',
        event: { onclick: (event) => calendarButtonEvent.next(event) },
    },
    { size: 'short', svg: calendarSvg },
);
