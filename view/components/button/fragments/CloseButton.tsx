import { Button } from '@components/button/Button';
import { CloseSvg } from '@svg/CloseSvg';
import { Subject, map } from 'rxjs';

// 닫기 버튼
export const CloseButton = (layer: HTMLDivElement) => {
    return (
        <Button
            svg={<CloseSvg />}
            // /event={{ onclick: () => layer.isConnected && layer.remove() }}
        ></Button>
    );
};
