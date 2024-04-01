import { Button } from '@components/button/Button';
import { TvSvg } from '@components/svg/TvSvg';
import { Subject, map } from 'rxjs';

// 생방송 버튼
export const tvButtonEvent = new Subject<Event>();
export const TvButton = () => {
    return <Button textContent="준비 중" size="short" svg={<TvSvg />}></Button>;
};
