import styles from './WebtoonViewCounter.module.css';

export type CounterProps = {
    count: number | undefined;
    svg: JSX.Element;
};
export const WebtoonViewCounter = ({ count, svg }: CounterProps) => (
    <div className={`${styles['counter']}`}>
        {count || 0}
        {svg}
    </div>
);
