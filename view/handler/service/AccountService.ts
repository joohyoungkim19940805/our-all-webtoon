import { callApiCache } from '@handler/service/CommonService';
import { ResponseWrapper } from '@type/ReesponseWrapper';
import { Account } from '@type/service/AccountType';
import { useState } from 'react';
import { catchError, map, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';

export const useIsLogin = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const checkLogin = () => {
        const subscription = callApiCache<void, void>(
            {
                method: 'GET',
                path: 'account',
                endpoint: 'is-login',
                resultHandler: response => {
                    const isLoggedIn =
                        response.status === 200 || response.status === 201;
                    setIsLogin(isLoggedIn);
                },
            },
            {
                cacheTime: 1000 * 30,
                cacheName: 'isLogin',
            }
        )
            .pipe(
                catchError((error: AjaxError) => {
                    console.log(error);
                    setIsLogin(false);
                    return of(false);
                })
            )
            .subscribe();

        // Return the subscription to allow cleanup if necessary
        return subscription;
    };

    return { isLogin, checkLogin };
};
export const getAccountInfoService = () => {
    return ajax<ResponseWrapper<Account>>('/api/account/search/get-info').pipe(
        map(response => {
            console.log(response.response);
            return response.response.data;
        }),
        catchError((error: AjaxError) => {
            console.log(error);
            return of(null);
        })
    );
};
