import { AddSvg } from '@components/svg/AddSvg';
import { Subject, filter, map } from 'rxjs';
import spinStyle from '@root/spin.module.css';
import { useEffect, useRef, useState } from 'react';
import styles from './Button.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { $pageChange } from '@handler/subject/PageChangeAnimationEvent';

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
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('/page/bottom')) {
            setIsSpinning(true);
        }
    }, [location]);
    useEffect(() => {
        const subscribe = $pageChange
            .pipe(filter(({ emissionDirection }) => emissionDirection === 'in'))
            .subscribe((event) => {
                if (event.isBack) {
                    console.log(isSpinning);
                    setIsSpinning(false);
                }
            });
        return () => {
            subscribe.unsubscribe();
        };
    });
    return (
        <button
            onClick={() => {
                setIsSpinning(!isSpinning);
                if (!isSpinning) {
                    const positionHeight =
                        svgRef.current?.parentElement?.getBoundingClientRect()
                            .height || 0;
                    $pageChange.next({
                        url: new URL(
                            `/page/bottom/start-painting-menu?positionHeight=${positionHeight}`,
                            window.location.origin,
                        ),
                        isBack: false,
                        emissionDirection: 'out',
                    });
                } else if (location.pathname.includes('/page/bottom')) {
                    $pageChange.next({
                        url: new URL(
                            `/page/bottom/start-painting-menu`,
                            window.location.origin,
                        ),
                        isBack: true,
                        emissionDirection: 'out',
                    });
                }
            }}
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            <AddSvg
                ref={svgRef}
                className={`${spinStyle.spin} ${(isSpinning && spinStyle.on) || ''}`}
            ></AddSvg>
        </button>
    );
};
