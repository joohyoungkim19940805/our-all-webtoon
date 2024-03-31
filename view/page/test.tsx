import { FlexLayout } from '@wrapper/FlexLayout';
import { Bottom } from '@wrapper/layout/Bottom';
import { Center } from '@wrapper/layout/Center';
import { Top } from '@wrapper/layout/Top';
import { createRoot } from 'react-dom/client';
import styles from './test3.module.css';
styles;
document.body.dataset.mode = 'black';
const rootElement = new FlexLayout({ id: 'root' });
rootElement.dataset.direction = 'column';
document.body.append(rootElement);

const root = createRoot(rootElement);

root.render(
    <>
        <Top></Top>
        <Center></Center>
        <Bottom></Bottom>
    </>,
);
