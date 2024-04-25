import { from, of, Observable, map, zip } from 'rxjs';
import styles from './LoginContainer.module.css';
import { Input } from '@components/input/Input';
import { FindAccountInfo } from '@container/account/FindAccountInfoContainer';
import buttonStyles from '@components/button/Button.module.css';
import inputStyles from '@components/input/Input.module.css';
import { SnsLoginContainer } from '@container/account/SnsLoginContainer';

export const LoginContainer = () => {
    return (
        <form className={styles['login-container']} id="login-form">
            <div className={styles['account-info-wrapper']}>
                <div className={styles['id-and-password-wrapper']}>
                    <input
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        type="text"
                        autoComplete="username webauthn"
                        placeholder="아이디를 입력하세요."
                        id="username"
                        name="username"
                    ></input>
                    <input
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        type="password"
                        autoComplete="current-password webauthn"
                        placeholder="비밀번호를 입력하세요."
                        id="password"
                        name="password"
                    ></input>
                </div>
                <FindAccountInfo></FindAccountInfo>
                <SnsLoginContainer></SnsLoginContainer>
            </div>
            <button
                type="submit"
                className={`${buttonStyles.button} ${buttonStyles['inherit']} ${styles['submit-button']}`}
            >
                로그인
            </button>
        </form>
    );
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
