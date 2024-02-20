import styles from './test.module.css';
console.log(styles.div);
import { a } from './test2';
console.log(a);
document.body.append(Object.assign(document.createElement('div'), {
    className: `aaa`,
    textContent: 'test'
}))