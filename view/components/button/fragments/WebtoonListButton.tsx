import { Button } from '@components/button/Button';
import { Subject, map } from 'rxjs';
import PlayListSearchSvg from '@svg/search-loading.svg';

// 웹툰 목록 버튼
export const webtoonListButtonEvent = new Subject<Event>();
export const WebtoonListButton = () => {
    return (
        <Button
            textContent="웹툰 목록"
            event={{ onclick: (event) => webtoonListButtonEvent.next(event) }}
            size="short"
            svg={PlayListSearchSvg}
        ></Button>
    );
};
