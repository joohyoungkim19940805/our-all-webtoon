import { Observable, Subject, catchError, map, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Account } from '@type/service/AccountType';
import { ResponseWrapper } from '@type/service/ReesponseWrapper';

export const useIsLoignService = (moveUrl?: string) => {
    const navigate = useNavigate();
    const [subscription, _] = useState<Observable<boolean>>(
        ajax<Boolean>('/api/account/search/is-login').pipe(
            map((response) => {
                if (moveUrl) navigate(moveUrl);
                return response.status === 200 || response.status === 201;
            }),
            catchError((error: AjaxError) => {
                console.log(error);
                if (error.status === 401 || error.status === 403) {
                    navigate('/page/layer/login-layer');
                }
                return of(!(error.status === 401 || error.status === 403));
            }),
        ),
    );
    return subscription;
};

export const getAccountInfoService = () => {
    return ajax<ResponseWrapper<Account>>('/api/account/search/get-info').pipe(
        map((response) => {
            console.log(response.response);
            return response.response.data;
        }),
        catchError((error: AjaxError) => {
            console.log(error);
            return of(null);
        }),
    );
};
