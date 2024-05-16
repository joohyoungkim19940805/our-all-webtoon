import inputStyles from '@components/input/Input.module.css';
import styles from './MyProfileContainer.module.css';
import { getAccountInfoService } from '@handler/service/AccountService';
import { Account } from '@type/service/AccountType';
import { useEffect, useRef, useState } from 'react';

export const MyProfileContainer = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [account, setAccount] = useState<Account>();

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
    /**
     * {
    "accountName": "김주형",
    "age": 30,
    "createdAt": "2024-04-22T12:54:22.921",
    "email": "oozu1994@gmail.com",
    "gender": "male",
    "isEnabled": true,
    "nickname": "mozu",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocLYZiRX_EG-sNeLU5W8KAao11H43Yv4QMpvdCADYZVqmCtCSw=s96-c",
    "providerId": "108542824068504068846",
    "lastProvider": "GOOGLE",
    "roles": [
        "ROLE_USER"
    ],
    "username": "김주형",
    "googleProviderInfo": {
        "email": "oozu1994@gmail.com",
        "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocLYZiRX_EG-sNeLU5W8KAao11H43Yv4QMpvdCADYZVqmCtCSw=s96-c",
        "id": "108542824068504068846"
    },
    "name": "김주형",
    "subject": "oozu1994@gmail.com",
    "issuer": "김주형"
}
     */
    return (
        <div className={`${styles['my-profile-container']}`}>
            <form ref={ref}>
                <div>
                    <label htmlFor="account-name">ID</label>
                    <input
                        type="text"
                        id="account-name"
                        name="accountName"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        readOnly
                        value={(account && account.accountName) || ''}
                    ></input>
                </div>
                <div>
                    <label htmlFor="account-password">PASSWORD</label>
                    <input
                        type="password"
                        id="account-password"
                        name="password"
                    ></input>
                </div>
            </form>
        </div>
    );
};
