import { Button } from '@components/button/Button';
import { Subject, map } from 'rxjs';

import CalendarSvg from '@svg/calendar.svg';

//연재 일정 버튼
export const calendarButtonEvent = new Subject<Event>();
export const CalendarButton = () => {
    return (
        <Button
            textContent="연재 일정"
            event={{ onclick: (event) => calendarButtonEvent.next(event) }}
            type="button"
            size="short"
            svg={CalendarSvg}
        ></Button>
    );
};