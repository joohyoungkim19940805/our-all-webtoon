import { FindAccountInfo } from '@component/account/FindAccountInfoContainer';
import { SnsLoginContainer } from '@component/account/SnsLoginContainer';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import buttonStyles from '../Button.module.css';
import inputStyles from '../Input.module.css';
import styles from './LoginContainer.module.css';

export const LoginContainer = () => {
    const location = useLocation();
    const [isWriterLogin, setIsWriterLogin] = useState<boolean>();
    useEffect(() => {
        const query = new URLSearchParams(location.search);
    }, [location.search]);
    console.log(location);
    return (
        <form
            className={styles['login-container']}
            id="login-form"
            method="post"
        >
            <div className={styles['account-info-wrapper']}>
                {isWriterLogin && (
                    <>
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
                        <button
                            type="submit"
                            className={`${buttonStyles.button} ${buttonStyles['inherit']} ${styles['submit-button']}`}
                        >
                            로그인
                        </button>
                    </>
                )}
                <SnsLoginContainer></SnsLoginContainer>
                {!isWriterLogin && (
                    <Button
                        type="button"
                        onClick={() => {
                            setIsWriterLogin(true);
                        }}
                    >
                        작가 아이디로 로그인
                    </Button>
                )}
            </div>
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
