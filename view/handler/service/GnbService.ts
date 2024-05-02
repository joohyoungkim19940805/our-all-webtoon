import { Subject, catchError, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export const myHomeService = ajax('/is-login').pipe(
    map((response) => {
        console.log(333, response);
        return 1;
    }),
    catchError((error) => {
        console.log(error);
        if (error.status === 401) {
            //$globalDimLayer.next(LoginContainer());
        }
        return of(error);
    }),
);
