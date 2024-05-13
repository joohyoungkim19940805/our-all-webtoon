import { Lnb } from '@wrapper/layout/dashboard/Lnb';

export const Body = () => {
    return (
        <flex-container data-is_resize={false} data-panel_mode="default">
            <flex-layout data-direction="row">
                <Lnb></Lnb>

                <flex-container
                    data-is_resize={true}
                    data-panel_mode="default"
                ></flex-container>
            </flex-layout>
        </flex-container>
    );
};
