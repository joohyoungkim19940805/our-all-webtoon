import styles from './test3.module.css';
console.log(styles.div);
import { a } from './test2';
import { longTypeButton } from '../components/Buttons'
import { Observable, Subject, map } from 'rxjs';
console.log(a);
document.body.append(Object.assign(document.createElement('div'), {
    className: `${styles.div} ${styles.aaa}`,
    textContent: 'test2zzzzz3a'
}))
longTypeButton.pipe(map(button => {
    button.textContent = 'aswewes';
    return button;
})).subscribe(button => {
    document.body.append(button);
})
longTypeButton.pipe(map(button => {
    button.textContent = 'aswewes222';
    return button;
})).subscribe(button => {
    document.body.append(button);
})


let btn = Object.assign(document.createElement('button'),{
    textContent : 'aa', 
});

const subject = new Subject();
btn.onclick = () => {
    subject.next('aaaaaa');
}

subject.subscribe((e)=>{
    console.log(e, 111111);
})

subject.subscribe((e)=>{
    console.log(e, 2222);
})

subject.subscribe((e)=>{
    console.log(e, 333);
})

subject.subscribe((e)=>{
    console.log(e, 444);
})

subject.subscribe((e)=>{
    console.log(e, 555);
})

document.body.append(btn);