import { Button } from '@components/button/Button';

import AddSvg from '@svg/add.svg';
import { Subject, map } from 'rxjs';
import spinStyle from '@components/spin.module.css';

// 웹툰 연재하기 버튼
export const paintingAddButtonEvent = new Subject<Event>();
paintingAddButtonEvent.subscribe((ev) => {
    /*
    svg.classList.add(spinStyle.spin);
    setTimeout(() => {
        svg.classList.remove(spinStyle.spin);
        //svg.ontransitionend = ()=> svg?.classList.remove(spinStyle.spin_target)
    }, 1000);
    */
});
export const PaintingAddButton = () => {
    return (
        <Button
            event={{ onclick: (event) => paintingAddButtonEvent.next(event) }}
            svg={AddSvg}
            size="short"
        ></Button>
    );
};
