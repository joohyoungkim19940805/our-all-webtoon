import { LoginContainer } from '@container/login/LoginContainer';
import { $globalDimLayer } from '@handler/subject/LayerEvent';
import { Subject, catchError, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export const myHomeService = ajax('/gnb/search/my').pipe(
    map((response) => {
        console.log(333, response);
        return 1;
    }),
    catchError((error) => {
        console.log(error);
        if (error.status === 401) {
            $globalDimLayer.next(LoginContainer());
        }
        return of(error);
    }),
);
