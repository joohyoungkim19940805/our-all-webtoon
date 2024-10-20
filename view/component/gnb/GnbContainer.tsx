import { StandardButton } from '@component/StandardButton';
import { globalBottomLayerSubject } from '@component/layer/GlobalBottomLayer';
import { PaintingListContainer } from '@component/painting/PaintingListContainer';
import { BoxSvg } from '@component/svg/BoxSvg';
import { SearchLoadingSvg } from '@component/svg/SearchLoadingSvg';
import { Box } from '@mui/material';
import spinStyle from '@root/spin.module.css';
import { AddSvg } from '@svg/AddSvg';
import { BoardSvg } from '@svg/BoardSvg';
import { BookmarkSvg } from '@svg/BookmarkSvg';
import { CalendarSvg } from '@svg/CalendarSvg';
import { ShoppingCart } from '@svg/ShoppingCart';
import { TvSvg } from '@svg/TvSvg';
import { forwardRef, useRef, useState } from 'react';
import styles from './GnbContainer.module.css';

// 새로 만든 MyHomeButton 컴포넌트를 임포트합니다.
import { MyHomeButton } from './MyHomeButton';

export const GnbContainer = forwardRef<HTMLDivElement>((_, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    //const location = useLocation();

    return (
        <Box ref={ref} className={styles['gnb-container']}>
            <StandardButton className="short top">
                <BoxSvg />
                최신 목록
            </StandardButton>
            <StandardButton className="short top">
                <SearchLoadingSvg />
                웹툰 목록
            </StandardButton>
            <StandardButton
                className="short top"
                onClick={() => {
                    if (!isSpinning) {
                        globalBottomLayerSubject.next({
                            openState: true,
                            layerName: 'paintingLayer',
                            children: <PaintingListContainer />,
                        });
                    } else {
                        globalBottomLayerSubject.next({
                            openState: false,
                            layerName: 'paintingLayer',
                        });
                    }
                    setIsSpinning(prev => !prev);
                }}
            >
                <AddSvg
                    ref={svgRef}
                    className={`${spinStyle.spin} ${(isSpinning && spinStyle.on) || ''}`}
                />
                웹툰 등록
            </StandardButton>

            {/* 분리된 MyHomeButton 컴포넌트를 사용합니다. */}
            <MyHomeButton />

            <StandardButton className="short top">
                <BoardSvg />
                게시판
            </StandardButton>
            <StandardButton className="short top">
                <BookmarkSvg />
                북마크
            </StandardButton>
            <StandardButton className="short top">
                <CalendarSvg />
                연재 일정
            </StandardButton>
            <StandardButton className="short top">
                <ShoppingCart />
                준비중
            </StandardButton>
            <StandardButton className="short top">
                <TvSvg />
                준비중
            </StandardButton>
        </Box>
    );
});
