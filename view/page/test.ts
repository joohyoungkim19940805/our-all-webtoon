import styles from './test3.module.css';
import { button } from '../components/button/Button'
import { input } from '../components/input/Input';
import { Observable, Subject, map, fromEvent, flatMap, mergeMap } from 'rxjs';

document.body.append(Object.assign(document.createElement('div'), {
    className: `${styles.div}`,
    textContent: 'test2zzzzz3a'
}))

button({
    size : 'middle'
}).pipe(mergeMap(button => {
    button.textContent = 'long type button';
    document.body.append(button);
    return fromEvent(button, 'click');
})).subscribe({
    next : (x) => {
        console.log(x);
    },
    error: (error) => {
        console.error(error);
    },
    complete : () => {
        console.log('complate!!')
    }
})

button().pipe(map(button => {
    button.textContent = 'asd';
    button.onclick = () => {
        subject.next('aaaaaa');
    }
    return button;
})).subscribe({
    next : (button) => {
        document.body.append(button);
    },
    error: (error) => {
        console.error(error);
    },
    complete : () => {
        console.log('complate!!')
    }
})
input({type : 'search'}, {lineColor : 'bright-grey'}).pipe(map(input => {
    input.value = 'abcd';
    return input
})).subscribe(input => {
    document.body.append(document.createElement('br'))
    document.body.append(input);
})

input({placeholder : '입력하세요'}, {lineColor : 'bright-grey'}).subscribe(input => {
    document.body.append(input);
})

const subject = new Subject();


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