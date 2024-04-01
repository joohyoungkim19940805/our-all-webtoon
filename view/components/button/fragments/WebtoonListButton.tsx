import { Button } from '@components/button/Button';
import { Subject, map } from 'rxjs';
import { SearchLoadingSvg } from '@components/svg/SearchLoadingSvg';

// 웹툰 목록 버튼
export const webtoonListButtonEvent = new Subject<Event>();
export const WebtoonListButton = () => {
    return (
        <Button
            textContent="웹툰 목록"
            size="short"
            svg={<SearchLoadingSvg />}
        ></Button>
    );
};
