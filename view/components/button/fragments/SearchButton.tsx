import { Button } from '@components/button/Button';
import { Subject, map } from 'rxjs';
import { SearchSvg } from '@svg/SearchSvg';

// 웹툰 검색 버튼
export const searchButtonEvent = new Subject<Event>();
export const SearchButton = () => {
    return <Button svg={<SearchSvg />}></Button>;
};
