import { Observable, from, map, zip } from 'rxjs';
import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';

export const Center = () => {
    return (
        <flex-container data-is_resize="true" data-panel_mode="center-cylinder">
            center!!
        </flex-container>
    );
};

//top(head), body(content)
/*
const $center: Observable<FlexContainer> = from(
    new Promise<FlexContainer>((res) => {
        let center = new FlexContainer({ textContent: '???' });
        center.style.minHeight = '1px';
        center.dataset.is_resize = 'true';
        center.panelMode = 'center-cylinder';
        res(center);
    }),
);

export const center = zip($center).pipe(
    map(([center]) => {
        //bottom.append(gnbContainer)
        return { center };
    }),
);
*/
