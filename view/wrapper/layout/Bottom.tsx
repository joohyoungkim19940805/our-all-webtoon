import { Observable, concat, delay, from, map, mergeMap, zip } from 'rxjs';
import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import { GnbContainer, useHeightState } from '@container/gnb/GnbContainer';
import { LoadingRotate } from '@components/loading/Loading';
import { useEffect, useRef, useState } from 'react';
import { windowResize } from '@handler/globalEvents';

export const Bottom = () => {
    const bottomRef = useRef<FlexContainer>(null);
    const { heights } = useHeightState();

    useEffect(() => {
        if (!bottomRef.current || !heights || !bottomRef.current.getRoot)
            return;
        const [gnbHeight, gnbFirstChildHeight] = heights;
        bottomRef.current.style.maxHeight = gnbHeight + 'px';
        bottomRef.current.dataset.grow = bottomRef.current.getRoot
            .mathGrow(gnbFirstChildHeight)
            .toString();

        bottomRef.current.getRoot.remain();
    }, [bottomRef]);

    return (
        <flex-container
            ref={bottomRef}
            data-grow="0.094"
            data-is_resize="false"
        >
            <GnbContainer></GnbContainer>
        </flex-container>
    );
};
