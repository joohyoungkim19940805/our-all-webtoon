import { Subject, map } from 'rxjs';

export const $lnbOpenClick = new Subject<React.MouseEvent>();
// $lnbOpenClick.pipe(
//     map((ev) => {
//         return ev;
//     }),
// );
