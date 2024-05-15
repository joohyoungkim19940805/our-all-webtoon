import inputStyles from '@components/input/Input.module.css';
import { getAccountInfoService } from '@handler/service/AccountService';
import { Account } from '@type/service/AccountType';
import { useEffect, useState } from 'react';

export const MyProfileContainer = () => {
    const [account, setAccount] = useState<Account>();
    const subscribe = getAccountInfoService().subscribe({
        next: (account) => {
            console.log('???', account);
        },
    });
    useEffect(() => {
        console.log('???');
        return () => {
            subscribe.unsubscribe();
        };
    });
    return (
        <div>
            <div></div>
        </div>
    );
};
