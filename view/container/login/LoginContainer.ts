import { from, of, Observable, map, zip } from 'rxjs';
import styles from './loginContainer.module.css'
import { input } from '@components/input/Input';
import { button } from '@components/button/Button';

export const usernameInput = input(
    {type:'text', autocomplete: 'username', placeholder : '아이디를 입력하세요.'}, 
    {lineColor: 'bright-purple'}
).pipe(map(username => {
    username.name = Object.keys({username})[0];
    return username;
}));

export const passwordInput = input(
    {type:'password', placeholder : '비밀번호를 입력하세요.'},
    {lineColor: 'bright-purple'}
).pipe(map(password => {
    password.name = Object.keys({password})[0];
}));

export const loginSubmitButton = button(
    {type : 'submit'}, 
    {size: 'inherit'}
).pipe(map(loginSubmit => {
    return loginSubmit;
}));

export const loginContainer = (()=>{
    let promise = new Promise<HTMLDivElement>(res=>{
		let div = Object.assign(document.createElement('div'), {
			className: ``
		});
		res(div);
	});
    return zip(from(promise), usernameInput, passwordInput)
})();