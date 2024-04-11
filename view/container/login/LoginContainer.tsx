import { from, of, Observable, map, zip } from 'rxjs';
import styles from './LoginContainer.module.css';
import { Input } from '@components/input/Input';
import { FindAccountInfo } from '@container/login/FindAccountInfoContainer';

export const UsernameInput = () => {
    return (
        <Input
            type="text"
            autocomplete="username"
            placeholder="아이디를 입력하세요."
            lineColor="bright-purple"
        ></Input>
    );
};
export const PasswordInput = () => {
    return (
        <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            autocomplete="current-password"
            lineColor="bright-purple"
        ></Input>
    );
};

export const LoginSubmitButton = () => {
    return (
        <button
            type="submit"
            className={`${styles.button} ${styles['inherit']}`}
        >
            로그인
        </button>
    );
};

export const LoginContainer = () => {
    <form className={styles['login-container']} id="login-form">
        <div className={styles['account-info-wrapper']}>
            <FindAccountInfo></FindAccountInfo>
            <div className={styles['id-and-password-wrapper']}>
                <UsernameInput></UsernameInput>
                <PasswordInput></PasswordInput>
            </div>
        </div>
        <LoginSubmitButton></LoginSubmitButton>
    </form>;
};

/*
export const loginSubmitButton = button(
    { type: 'submit' },
    { size: 'inherit' },
).pipe(
    map((loginSubmit) => {
        loginSubmit.textContent = '로그인';
        loginSubmit.name = Object.keys({ loginSubmit })[0];
        loginSubmit.onclick = () => loginSubmit.form?.requestSubmit();
        return loginSubmit;
    }),
);
*/
/*
const loginContainer = (() => {
    let promise = new Promise<HTMLFormElement>((res) => {
        let form = Object.assign(document.createElement('form'), {
            className: styles['login-container'],
            id: 'login-form',
            onsubmit: (event: SubmitEvent) => event.preventDefault(),
        });
        form.dataset.test = 'aaa';
        res(form);
    });
    return zip(
        from(promise),
        findAccountInfo,
        usernameInput,
        passwordInput,
        loginSubmitButton,
    ).pipe(
        map((zipList) => {
            let [container, { container: findAccountInfo }, ...components] =
                zipList;
            let [usernameInput, passwordInput, loginButton] = components;

            let idAndPasswordWrapper = Object.assign(
                document.createElement('div'),
                {
                    className: styles['id-and-password-wrapper'],
                },
            );
            idAndPasswordWrapper.append(usernameInput, passwordInput);
            let accountInfoWrapper = Object.assign(
                document.createElement('div'),
                {
                    className: styles['account-info-wrapper'],
                },
            );
            accountInfoWrapper.append(idAndPasswordWrapper, findAccountInfo);
            container.replaceChildren(accountInfoWrapper, loginButton);
            return {
                container,
                components,
            };
        }),
    );
})();
*/
