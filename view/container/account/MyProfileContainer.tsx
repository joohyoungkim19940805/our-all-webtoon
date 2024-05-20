import inputStyles from '@components/input/Input.module.css';
import styles from './MyProfileContainer.module.css';
import { getAccountInfoService } from '@handler/service/AccountService';
import { Account } from '@type/service/AccountType';
import { useEffect, useRef, useState } from 'react';

export const MyProfileContainer = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [account, setAccount] = useState<Account>();
    const [passwordInputLength, setPasswordInputLength] = useState<number>(0);
    useEffect(() => {
        const subscribe = getAccountInfoService().subscribe({
            next: (account) => {
                if (account) setAccount(account);
            },
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [ref]);
    return (
        <div className={`${styles['my-profile-container']}`}>
            <form
                className={`${styles['my-profile-form']}`}
                ref={ref}
                method="POST"
            >
                <div className={`${styles['submit-button-wrapper']}`}>
                    <button type="submit">등록</button>
                </div>
                <div>
                    <label htmlFor="account-name">ID</label>
                    <input
                        type="text"
                        id="account-name"
                        name="accountName"
                        autoComplete="username"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        readOnly
                        value={(account && account.accountName) || ''}
                    ></input>
                </div>
                <div>
                    <label htmlFor="account-password">PASSWORD</label>
                    <input
                        onInput={(ev) =>
                            setPasswordInputLength(
                                ev.currentTarget.value.length,
                            )
                        }
                        type="password"
                        id="account-password"
                        name="password"
                        autoComplete="current-password"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                    ></input>
                </div>
                {passwordInputLength > 0 && (
                    <div>
                        <label htmlFor="account-re-password"></label>
                        <input
                            type="password"
                            id="account-re-password"
                            placeholder="비밀번호 재입력"
                            name="account-re-password"
                            autoComplete="new-password"
                        ></input>
                    </div>
                )}
                <div>
                    <label htmlFor="account-email">EMAIL</label>
                    <input
                        type="email"
                        id="account-email"
                        name="email"
                        autoComplete="username"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        defaultValue={(account && account.email) || ''}
                    ></input>
                </div>
                <div>
                    <label htmlFor="account-age">AGE</label>
                    <input
                        type="number"
                        id="account-age"
                        name="age"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        defaultValue={(account && account.age) || ''}
                    ></input>
                </div>
                <div>
                    <label htmlFor="account-gender">GENDER</label>
                    <select
                        id="account-gender"
                        name="gender"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                    >
                        <option disabled>what is your gender?</option>
                        <option
                            value="MALE"
                            selected={account && account.gender === 'MALE'}
                        >
                            남성
                        </option>
                        <option
                            value="FEMALE"
                            selected={account && account.gender === 'FEMALE'}
                        >
                            여성
                        </option>
                        <option
                            value="NONBINARY"
                            selected={account && account.gender === 'NONBINARY'}
                        >
                            논바이너리
                        </option>
                    </select>
                </div>
                <div>
                    <label>NICKNAME</label>
                    <input
                        type="text"
                        id="account-nickname"
                        name="nickname"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        defaultValue={(account && account.nickname) || ''}
                    ></input>
                </div>
            </form>
        </div>
    );
};
