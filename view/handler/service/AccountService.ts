import { Observable, Subject, catchError, map, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
                navigate('/page/layer/login-layer');
                return of(!(error.status === 401 || error.status === 403));
            }),
        ),
    );
    return subscription;
};
