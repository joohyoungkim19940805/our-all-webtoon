import styles from './test3.module.css';
console.log(styles.div);
import { a } from './test2';
console.log(a);
document.body.append(Object.assign(document.createElement('div'), {
    className: `${styles.div}`,
    textContent: 'test'
}))