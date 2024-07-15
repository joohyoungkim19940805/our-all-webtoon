import { Genre } from '@type/service/Genre';
import { ResponseWrapper } from '@type/ReesponseWrapper';
import {
    BehaviorSubject,
    ReplaySubject,
    buffer,
    catchError,
    concat,
    concatMap,
    map,
    merge,
    mergeMap,
    of,
    shareReplay,
    switchMap,
    take,
    tap,
    timer,
} from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';
import { Editor } from '@type/Editor';

const genreService = () =>
    ajax<ResponseWrapper<Genre[]>>('/api/webtoon/search/genre').pipe(
        map((result) => {
            console.log(result.response, result.response.data);
            return result.response.data;
        }),
        shareReplay(1, 1000 * 60 * 5),
    );
const genreCacheService = new BehaviorSubject(genreService());
export const getGenreService = genreCacheService.pipe(
    mergeMap((shared) =>
        shared.pipe(
            tap({ complete: () => genreCacheService.next(genreService()) }),
        ),
    ),
    take(1),
    catchError((error: AjaxError) => {
        console.log(error);
        return of(null);
    }),
);

// genreService.pipe(
//     shareReplay(1),
//     take(1),
//     catchError((error: AjaxError) => {
//         console.log(error);
//         return of(null);
//     }),
// );

export const postWebtoonService = ({
    agree,
    webtoonTitle,
    genre,
    synopsis,
}: {
    agree: string;
    webtoonTitle: string;
    genre: Array<string>;
    synopsis: Editor[];
    thumbnail?: string;
}) => {
    ajax<ResponseWrapper<unknown>>({
        url: '/api/webtoon/regist/',
        method: 'POST',
        body: {
            agree,
            webtoonTitle,
            genre,
            synopsis,
        },
    }).pipe(
        map((result) => {
            console.log(result.response, result.response.data);
            return result.response.data;
        }),
    );
};

export const postWebtoonThumbnailService = () => {};
