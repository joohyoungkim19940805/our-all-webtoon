import {
    BehaviorSubject,
    Observable,
    Subject,
    catchError,
    concatMap,
    map,
    of,
    shareReplay,
    take,
    tap,
} from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Account } from '@type/service/AccountType';
import { ResponseWrapper } from '@type/ReesponseWrapper';
import { WebtoonTermsOfService } from '@type/service/TermsOfServiceType';

const webtoonTermsOfService = () =>
    ajax<ResponseWrapper<WebtoonTermsOfService>>(
        '/api/terms/search/webtoon-terms',
    ).pipe(
        map((result) => {
            console.log(result.response, result.response.data);
            return result.response.data;
        }),
        shareReplay(1, 1000 * 60 * 5),
    );
const getWebtoonTermsOfCaCheService = new BehaviorSubject(
    webtoonTermsOfService(),
);
export const getWebtoonTermsOfService = getWebtoonTermsOfCaCheService.pipe(
    concatMap((shared) =>
        shared.pipe(
            tap({
                complete: () =>
                    getWebtoonTermsOfCaCheService.next(webtoonTermsOfService()),
            }),
        ),
    ),
    take(1),
    catchError((error: AjaxError) => {
        console.log(error);
        return of(null);
    }),
);
