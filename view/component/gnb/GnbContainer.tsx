import { StandardButton } from '@component/StandardButton';
import styles from './GnbContainer.module.css';

import { BoxSvg } from '@component/svg/BoxSvg';
import { SearchLoadingSvg } from '@component/svg/SearchLoadingSvg';
import { AddSvg } from '@svg/AddSvg';
import { forwardRef, useRef, useState } from 'react';

import { Box } from '@mui/material';
import spinStyle from '@root/spin.module.css';
import { BoardSvg } from '@svg/BoardSvg';
import { BookmarkSvg } from '@svg/BookmarkSvg';
import { CalendarSvg } from '@svg/CalendarSvg';
import { ShoppingCart } from '@svg/ShoppingCart';
import { TvSvg } from '@svg/TvSvg';
import { UserlaneSvg } from '@svg/UserlaneSvg';
import { useLocation } from 'react-router-dom';

/*type GnbContainerProps = {
    ref: LegacyRef<HTMLDivElement>; // Add the ref prop
};*/
//ul로 바꿔보기 2024 03 29
export const GnbContainer = forwardRef<HTMLDivElement>((_, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const location = useLocation();
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
            <StandardButton className="short top">
                <AddSvg
                    ref={svgRef}
                    className={`${spinStyle.spin} ${(isSpinning && spinStyle.on) || ''}`}
                />
                웹툰 등록
            </StandardButton>
            <StandardButton className="short top">
                <BoardSvg />
                게시판
            </StandardButton>
            <StandardButton className="short top">
                <UserlaneSvg />
                MY
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
