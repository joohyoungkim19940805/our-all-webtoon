/*
import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import styles from './test3.module.css';
import { bottom } from '@wrapper/layout/Bottom';
import { accessNavigation, windowResize } from '@handler/globalEvents';
import common from '@handler/common';
styles;

let root = new FlexLayout({ id: 'root' });
root.dataset.direction = 'column';
document.body.append(root);
bottom.subscribe(({ bottom, gnbContainer }) => {
    root.replaceChildren(bottom);
    bottom.style.minHeight = gnbContainer.children[0].clientHeight + 'px';
    bottom.style.maxHeight = gnbContainer.clientHeight + 'px';
    common.renderingAwait(bottom).then((ele) => {
        bottom.dataset.grow = root
            .mathGrow(gnbContainer.children[0].clientHeight)
            ?.toString();
        bottom.style.minHeight = '';
        root.remain();
    });
    windowResize.subscribe((ev) => {
        bottom.style.maxHeight = gnbContainer.clientHeight + 'px';
        bottom.dataset.grow = root
            .mathGrow(gnbContainer.children[0].clientHeight)
            ?.toString();
        root.remain();
    });
});
*/
