import { FlexContainer } from '@wrapper/FlexLayout';
import styles from './Head.module.css';
import { DashboardLnb } from '@container/lnb/DashboardLnb';
import buttonStyles from '@components/button/Button.module.css';
import { MenuSvg } from '@svg/MenuSvg';

export const Head = () => {
    return (
        <flex-container
            data-is_resize={false}
            data-panel_mode="default"
            data-grow={0.2}
        >
            <div className={`${styles['head-container']}`}>
                <button
                    type="button"
                    className={`${styles['lbn-button']} ${buttonStyles.button} ${buttonStyles.svg} ${buttonStyles[`svg_top`]}`}
                >
                    <MenuSvg></MenuSvg>
                </button>
            </div>
        </flex-container>
    );
};
