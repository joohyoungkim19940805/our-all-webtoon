import { DashboardLnb } from '@container/lnb/DashboardLnb';
import { FlexLayout, FlexContainer } from '@wrapper/FlexLayout';
export const Body = () => {
    return (
        <flex-container data-is_resize={false} data-panel_mode="default">
            <flex-layout data-direction="row">
                <flex-container
                    data-is_resize={true}
                    data-grow={0}
                    data-panel_mode="default"
                >
                    <DashboardLnb></DashboardLnb>
                </flex-container>

                <flex-container
                    data-is_resize={true}
                    data-panel_mode="default"
                ></flex-container>
            </flex-layout>
        </flex-container>
    );
};
