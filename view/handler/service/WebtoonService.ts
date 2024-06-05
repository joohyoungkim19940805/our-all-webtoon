import { Genre } from '@type/GenreType';
import { ResponseWrapper } from '@type/service/ReesponseWrapper';
import { catchError, map, of } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';

export const getGenreService = () => {
    return ajax<ResponseWrapper<Genre[]>>('/api/webtoon/search/genre').pipe(
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

export const registWebtoonService = () => {};
