import { FlexContainer } from '@wrapper/FlexLayout';
import styles from './Head.module.css';
import { DashboardLnb } from '@container/lnb/DashboardLnb';
import buttonStyles from '@components/button/Button.module.css';
import { MenuSvg } from '@svg/MenuSvg';
import { $lnbOpenClick } from '@handler/subject/LnbEvent';
import { useEffect, useRef } from 'react';
import { useFirstChildHeight } from '@handler/hooks/SizeChangeHooks';

export const Head = () => {
    const bottomRef = useRef<FlexContainer>(null);
    const { ref: gnbRef, heights } = useFirstChildHeight();

    useEffect(() => {
        if (!bottomRef.current || !heights || !bottomRef.current.getRoot)
            return;
        const [gnbHeight, gnbFirstChildHeight] = heights;
        bottomRef.current.style.maxHeight = gnbHeight + 'px';
        bottomRef.current.dataset.grow = bottomRef.current.getRoot
            .mathGrow(gnbFirstChildHeight)
            .toString();

        bottomRef.current.getRoot.remain();
    }, [bottomRef, heights]);

    return (
        <flex-container
            data-is_resize={true}
            data-panel_mode="default"
            data-grow={0.2}
            ref={bottomRef}
        >
            <div className={`${styles['head-container']}`} ref={gnbRef}>
                <button
                    type="button"
                    className={`${styles['lbn-button']} ${buttonStyles.button} ${buttonStyles.svg} ${buttonStyles[`svg_top`]}`}
                    onClick={(ev) => {
                        $lnbOpenClick.next(ev);
                    }}
                >
                    <MenuSvg></MenuSvg>
                </button>
            </div>
        </flex-container>
    );
};
