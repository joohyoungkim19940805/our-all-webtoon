import { ReactElement, ReactNode } from 'react';
import { Subject } from 'rxjs';

export const $globalDimLayer = new Subject<
    ReactNode | ReactElement | JSX.Element | undefined
>();
