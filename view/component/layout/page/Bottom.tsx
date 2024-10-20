import { FlexContainer } from '@component/FlexLayout';
import { GnbContainer } from '@component/gnb/GnbContainer';
import { useFirstChildHeight } from '@handler/hooks/SizeChangeHooks';
import { useEffect, useRef } from 'react';

export const Bottom = () => {
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
            ref={bottomRef}
            data-grow={0.094}
            data-is_resize={false}
        >
            <GnbContainer ref={gnbRef}></GnbContainer>
        </flex-container>
    );
};
