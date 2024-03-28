import { button } from '@components/button/Button';

import AddSvg from '@svg/add.svg';
import { Subject, map } from 'rxjs';
import spinStyle from '@components/spin.module.css';

// 웹툰 연재하기 버튼
export const paintingAddButtonEvent = new Subject<Event>();
export const paintingAddButton = button(
    {
        event: {
            onclick: (e) => {
                paintingAddButtonEvent.next(e);
            },
        },
    },
    { size: 'short', animation: 'spin', svg: AddSvg },
).pipe(
    map((paintingAdd) => {
        const svg = paintingAdd.querySelector('svg');
        if (!svg) return paintingAdd;
        svg.classList.add(spinStyle.spin_target);
        paintingAddButtonEvent.subscribe((ev) => {
            svg.classList.add(spinStyle.spin);
            setTimeout(() => {
                svg.classList.remove(spinStyle.spin);
                //svg.ontransitionend = ()=> svg?.classList.remove(spinStyle.spin_target)
            }, 1000);
        });
        return paintingAdd;
    }),
);
