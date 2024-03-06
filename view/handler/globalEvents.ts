import {fromEvent} from 'rxjs'

export const windowResize = fromEvent(window, 'resize');