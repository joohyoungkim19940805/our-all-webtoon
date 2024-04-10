import { AddSvg } from '@components/svg/AddSvg';
import { Subject, map } from 'rxjs';
import spinStyle from '@root/spin.module.css';
import { useEffect, useRef, useState } from 'react';
import styles from './Button.module.css';

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
    return (
        <button
            onClick={() => setIsSpinning(!isSpinning)}
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            <AddSvg ref={svgRef} className={spinStyle.spin}></AddSvg>
        </button>
    );
};
