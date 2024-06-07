import { Observable, Subject, catchError, map, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Account } from '@type/service/AccountType';
import { ResponseWrapper } from '@type/ReesponseWrapper';
import { WebtoonTermsOfService } from '@type/service/TermsOfServiceType';

export const getWebtoonTermsOfService = () => {
    return ajax<ResponseWrapper<WebtoonTermsOfService>>(
        '/api/terms/search/webtoon-terms',
    ).pipe(
        map((result) => {
            console.log(result.response, result.response.data);
            return result.response.data;
        }),
        catchError((error: AjaxError) => {
            console.log(error);
            return of(null);
        }),
    );
};
