import { Button } from '@components/button/Button';
import { Subject, map } from 'rxjs';
import { BoxSvg } from '@components/svg/BoxSvg';

// 최신 업데이트 버튼
export const latestUpdateButtonEvent = new Subject<Event>();
latestUpdateButtonEvent.subscribe((e) => console.log(e));
export const LatestUpdateButton = () => {
    return (
        <Button
            textContent="최신 업데이트"
            size="short"
            svg={<BoxSvg />}
        ></Button>
    );
};
