import { Subject, map } from 'rxjs';

export const sortValues = [
    ['latest', '업데이트순'],
    ['views', '조회순'],
    ['star_rating', '별점순'],
] as const;

export const sexValues = [
    ['male', '남자'],
    ['female', '여자'],
] as const;

export const ageValues = [
    ['_10', '10대'],
    ['_20', '20대'],
    ['_30', '30대'],
    ['_40', '40대'],
    ['_50', '50대'],
    ['_60', '60대'],
    ['_70', '70대 이상'],
] as const;

export const wayValues = [
    ['one_way', '한줄'],
    ['two_way', '두줄'],
] as const;

export type Sort = (typeof sortValues)[number];

export type Sex = (typeof sortValues)[number];

export type Age = (typeof ageValues)[number];

export type Way = (typeof wayValues)[number];

export type FilterBarChangeEvent = {
    value?: Sort | Sex | Age | Way;
    event?: React.ChangeEvent<HTMLSelectElement>;
};

export const $filterBarChange = new Subject<FilterBarChangeEvent>();
$filterBarChange.pipe(
    map(({ value, event }) => {
        event;
        return value;
    }),
);
