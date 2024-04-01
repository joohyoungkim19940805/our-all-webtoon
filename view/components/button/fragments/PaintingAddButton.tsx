import { Button } from '@components/button/Button';

import { AddSvg } from '@components/svg/AddSvg';
import { Subject, map } from 'rxjs';
import spinStyle from '@root/spin.module.css';
import { useEffect, useRef, useState } from 'react';

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
    const svgRef = useRef<SVGSVGElement>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    useEffect(() => {
        if (!svgRef.current) return;

        if (isSpinning) svgRef.current.classList.add(spinStyle.on);
        else svgRef.current.classList.remove(spinStyle.on);
    }, [isSpinning, svgRef]);
    console.log(spinStyle.spin);
    return (
        <Button
            svg={<AddSvg ref={svgRef} className={spinStyle.spin} />}
            size="short"
            onClick={() => setIsSpinning(!isSpinning)}
        ></Button>
    );
};
