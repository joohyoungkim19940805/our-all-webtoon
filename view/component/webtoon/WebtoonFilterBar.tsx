import {
    $filterBarChange,
    Age,
    Sex,
    Sort,
    Way,
    ageValues,
    sexValues,
    sortValues,
    wayValues,
} from '@handler/subject/FilterBarEvent';
import { useEffect, useRef } from 'react';
import selectStyles from '../Select.module.css';
import styles from './WebtoonFilterBar.module.css';

export const WebtoonFilterBar = () => {
    const wayRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        if (!wayRef.current) return;
        $filterBarChange.next({
            event: undefined,
            value: [
                wayRef.current.selectedOptions[0].value,
                wayRef.current.selectedOptions[0].textContent || '',
            ] as Way,
        });
    }, [wayRef]);
    return (
        <div className={styles['webtoon-filter-box']}>
            <div className={styles['sort']}>
                <select
                    className={selectStyles.select}
                    onChange={e =>
                        $filterBarChange.next({
                            event: e,
                            value:
                                e.target.selectedIndex == 0
                                    ? undefined
                                    : ([
                                          e.target.selectedOptions[0].value,
                                          e.target.selectedOptions[0]
                                              .textContent || '',
                                      ] as Sort),
                        })
                    }
                >
                    {sortValues.map(([value, text], i) => {
                        return (
                            <option key={i} value={value}>
                                {text}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={styles['sex-age']}>
                <select
                    className={`${selectStyles.select} ${styles.sex}`}
                    onChange={e =>
                        $filterBarChange.next({
                            event: e,
                            value:
                                e.target.selectedIndex == 0
                                    ? undefined
                                    : ([
                                          e.target.selectedOptions[0].value,
                                          e.target.selectedOptions[0]
                                              .textContent || '',
                                      ] as Sex),
                        })
                    }
                >
                    <option value="">성별 전체</option>
                    {sexValues.map(([value, text], i) => {
                        return (
                            <option key={i} value={value}>
                                {text}
                            </option>
                        );
                    })}
                </select>
                <select
                    className={`${selectStyles.select} ${styles.age}`}
                    onChange={e =>
                        $filterBarChange.next({
                            event: e,
                            value:
                                e.target.selectedIndex == 0
                                    ? undefined
                                    : ([
                                          e.target.selectedOptions[0].value,
                                          e.target.selectedOptions[0]
                                              .textContent || '',
                                      ] as Age),
                        })
                    }
                >
                    <option value="">연령 전체</option>
                    {ageValues.map(([value, text], i) => {
                        return (
                            <option key={i} value={value}>
                                {text}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={styles['list-column']}>
                <select
                    ref={wayRef}
                    className={selectStyles.select}
                    onChange={e =>
                        $filterBarChange.next({
                            event: e,
                            value: [
                                e.target.selectedOptions[0].value,
                                e.target.selectedOptions[0].textContent || '',
                            ] as Way,
                        })
                    }
                >
                    {wayValues.map(([value, text], i) => {
                        return (
                            <option key={i} value={value}>
                                {text}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};
