import styles from './test.module.css';
console.log(styles.div);

document.body.append(Object.assign(document.createElement('div'), {
    className: `${styles.div}`,
    textContent: 'test'
}))