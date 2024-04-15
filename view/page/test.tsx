import { FlexLayout } from '@wrapper/FlexLayout';
import { Bottom } from '@wrapper/layout/Bottom';
import { Center } from '@wrapper/layout/Center';
import { Top } from '@wrapper/layout/Top';
import { createRoot } from 'react-dom/client';
import styles from './test3.module.css';
import { GlobalDimLayer } from '@wrapper/layer/Layer';
styles;
FlexLayout;
document.body.dataset.mode = 'black';
const root = document.createElement('main');
root.id = styles.root;

document.body.append(root);

const main = createRoot(root);
//

main.render(
    <>
        <flex-layout data-direction="column">
            <Top></Top>
            <Center></Center>
            <Bottom></Bottom>
        </flex-layout>
        <GlobalDimLayer></GlobalDimLayer>
    </>,
);
