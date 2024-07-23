import styles from './views.module.css';

export type CounterProps = {
    count: number | undefined;
    svg: JSX.Element;
};
export const Counter = ({ count, svg }: CounterProps) => (
    <div className={`${styles['counter']}`}>
        {count || 0}
        {svg}
    </div>
);
