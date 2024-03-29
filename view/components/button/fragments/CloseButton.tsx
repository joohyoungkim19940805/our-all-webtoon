import { Button } from '@components/button/Button';
import closeSvg from '@svg/close.svg';
import { Subject, map } from 'rxjs';

// 닫기 버튼
export const CloseButton = (layer: HTMLDivElement) => {
    return (
        <Button
            event={{ onclick: () => layer.isConnected && layer.remove() }}
        ></Button>
    );
};
