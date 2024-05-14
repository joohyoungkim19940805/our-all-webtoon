import { Subject } from 'rxjs';

export type PageChangeType = {
    url: URL;
    isBack: boolean;
    emissionDirection: 'in' | 'out';
};

export const $pageChange = new Subject<PageChangeType>();

//$pageChange.pipe()
