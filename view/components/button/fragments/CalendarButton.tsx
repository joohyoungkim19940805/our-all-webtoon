import { Button } from '@components/button/Button';
import { Subject, map } from 'rxjs';

import { CalendarSvg } from '@svg/CalendarSvg';

//연재 일정 버튼
export const calendarButtonEvent = new Subject<Event>();
export const CalendarButton = () => {
    return (
        <Button
            textContent="연재 일정"
            type="button"
            size="short"
            svg={<CalendarSvg />}
        ></Button>
    );
};
