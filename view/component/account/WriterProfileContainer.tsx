import { BlackButton } from '@component/StandardButton';
import { FileInputThumbnail } from '@component/account/FileInput';
import { getAccountInfoService } from '@handler/service/AccountService';
import { callApi } from '@handler/service/CommonService';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import shake from '@root/shake.module.css';
import { Account } from '@type/service/AccountType';
import {
    ChangeEvent,
    FocusEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

const handleInputNumber = (
    target: HTMLInputElement,
    callback?: (target: HTMLInputElement) => void
) => {
    const currentValue = parseInt(target.value);
    if (currentValue <= parseInt(target.min)) {
        target.value = target.min;
    } else if (currentValue >= parseInt(target.max)) {
        target.value = target.max;
    }
    if (callback) callback(target);
};

const InputField = ({
    label,
    name,
    id,
    type = 'text',
    required = false,
    ...rest
}: {
    label: string;
    name: string;
    id: string;
    type?: string;
    required?: boolean;
    [key: string]: any;
}) => (
    <Box
        sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            '& > label': {
                flex: '0 0 20dvw;',
            },
            '& input': {
                flex: 1,
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1.15rem',
                '&:focus': {
                    borderColor: '#6e8efb',
                    outline: 'none',
                    boxShadow: '0 0 5px rgba(110, 142, 251, 0.5)',
                },
            },
        }}
    >
        <label htmlFor={id}>{label}</label>
        <input type={type} name={name} id={id} {...rest} />
    </Box>
);
const isCheckValidPassword = (password: string) => {
    return [/([a-z])/, /([A-Z])/, /\d/, /[!@#$%^&*(),.?":{}|<>]/].every(regex =>
        regex.test(password)
    );
};

export const WriterProfileContainer = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [account, setAccount] = useState<Account | null>(null);
    const [isPasswordInputValidity, setIsPasswordInputValidity] =
        useState<boolean>(false);
    const [isCheckEtc, setIsCheckEtc] = useState<boolean>(false);
    const [gender, setGender] = useState<string>(account?.gender || '');
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const passwordMessageRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        setGender(account?.gender || '');
    }, [account]);

    useEffect(() => {
        const subscribe = getAccountInfoService().subscribe({
            next: (account: Account | null) => {
                if (account) setAccount(account);
            },
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [ref]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) return form.reportValidity();

        const formData = new FormData(form);
        const formObject: { [key: string]: string } = Array.from(
            formData.entries()
        ).reduce((total, item) => {
            const [key, value] = item;
            if (value instanceof File) return total;
            total[key] = value as string;
            return total;
        }, {} as any);
        console.log(formObject);
        callApi({
            method: 'POST',
            path: 'oauth2',
            endpoint: 'sing-up',
            body: formObject,
        }).subscribe({
            next: (result: any) => {
                console.log(result);
            },
            error: (error: any) => {
                console.error(error);
                alert(error.response.message);
            },
        });
        console.log(formData);
    };
    return (
        <form
            onSubmit={handleSubmit}
            ref={ref}
            style={{
                height: '100%',
                width: '100%',
                overflowY: 'auto',
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                    padding: '2dvh 2rem',
                    gap: '2dvh',
                }}
            >
                <FileInputThumbnail
                    textContent="프로필 이미지"
                    name="profileImage"
                    mode="circle"
                />
                <InputField
                    label="작가명"
                    name="writerName"
                    id="writer_name"
                    required
                    placeholder="작가명을 입력하세요."
                />
                <InputField
                    label="로그인 아이디"
                    name="accountName"
                    id="account_name"
                    required
                    placeholder="아이디를 입력하세요."
                    autoComplete="username webauthn"
                    defaultValue={(account && account.accountName) || ''}
                />
                <InputField
                    label="비밀번호"
                    name="password"
                    id="password"
                    type="password"
                    required
                    placeholder="비밀번호를 입력하세요."
                    autoComplete="current-password webauthn"
                    onInput={(ev: ChangeEvent<HTMLInputElement>) => {
                        const isValidPassword = isCheckValidPassword(
                            ev.currentTarget.value
                        );
                        if (isValidPassword) {
                            ev.currentTarget.setCustomValidity('');
                        } else {
                            ev.currentTarget.setCustomValidity(
                                '대문자, 소문자, 숫자, 그리고 특수문자를 모두 포함해야 합니다.'
                            );
                        }
                        setIsPasswordInputValidity(isValidPassword);
                    }}
                    onBlur={(ev: FocusEvent<HTMLInputElement>) => {
                        if (
                            !passwordMessageRef.current ||
                            ev.currentTarget.value.length == 0
                        )
                            return;
                        if (!isCheckValidPassword(ev.currentTarget.value)) {
                            passwordMessageRef.current.classList.add(
                                shake.shake
                            );
                            setTimeout(() => {
                                passwordMessageRef.current?.classList.remove(
                                    shake.shake
                                );
                            }, 400);
                        }
                    }}
                />
                {!isPasswordInputValidity && (
                    <Typography
                        variant="caption"
                        color="#ff5d5d"
                        ref={passwordMessageRef}
                    >
                        대문자, 소문자, 숫자, 그리고 특수문자를 모두 포함해야
                        합니다.
                    </Typography>
                )}
                {isPasswordInputValidity && (
                    <InputField
                        label="비밀번호 재입력"
                        name="passwordAgain"
                        id="password_again"
                        type="password"
                        required
                        placeholder="비밀번호를 다시 입력하세요."
                        autoComplete="current-password"
                        onInput={(ev: ChangeEvent<HTMLInputElement>) => {
                            const passwordInput =
                                document.querySelector<HTMLInputElement>(
                                    'input[name="password"]'
                                );
                            if (
                                passwordInput &&
                                ev.currentTarget.value !== passwordInput.value
                            ) {
                                ev.currentTarget.setCustomValidity(
                                    '재입력된 비밀번호가 일치하지 않습니다.'
                                );
                            } else {
                                ev.currentTarget.setCustomValidity('');
                            }
                        }}
                    />
                )}

                <InputField
                    label="이메일"
                    name="email"
                    id="email"
                    type="email"
                    required
                    placeholder="이메일을 입력하세요."
                    autoComplete="email webauthn"
                />
                <FormControlLabel
                    control={<Checkbox name="isAlarmEmail" value="true" />}
                    label="뉴스레터나 공지이메일을 수신받겠습니다."
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">성별</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={gender}
                        onChange={ev => setGender(ev.target.value)}
                    >
                        <FormControlLabel
                            value="MALE"
                            control={<Radio required />}
                            label="남성"
                        />
                        <FormControlLabel
                            value="FEMALE"
                            control={<Radio required />}
                            label="여성"
                        />
                    </RadioGroup>
                </FormControl>
                {/* 생년월일 입력 */}
                <Box display="flex" alignItems="center" width="100%" mb={2}>
                    <Typography variant="body1" sx={{ flexBasis: '13rem' }}>
                        생년월일
                    </Typography>
                    <Box display="flex" gap={2} flex={1}>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            required
                            placeholder="년(4자)"
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                            min={0}
                            max={new Date().getFullYear()}
                            list="year-list"
                            onInput={ev => {
                                handleInputNumber(
                                    ev.nativeEvent.target as HTMLInputElement,
                                    target => setYear(parseInt(target.value))
                                );
                                if (ev.currentTarget.value == '0') {
                                    ev.currentTarget.setCustomValidity(
                                        '년도가 1보다 작을 순 없습니다.\n그때 당신은 존재하지 않았을 겁니다.'
                                    );
                                } else if (
                                    parseInt(ev.currentTarget.value) <
                                    parseInt(
                                        ev.currentTarget.list?.options[0]
                                            .value || '1900'
                                    )
                                ) {
                                    ev.currentTarget.setCustomValidity(
                                        '나이가 너무 많습니다.\n세계 최고령은 122세입니다. \n기네스북에 도전 후 다시 시도해주십시오.'
                                    );
                                } else {
                                    ev.currentTarget.setCustomValidity('');
                                }
                            }}
                        />
                        <input
                            type="number"
                            name="month"
                            required
                            placeholder="월"
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                            min="0"
                            max="12"
                            list="month-list"
                            onInput={ev => {
                                handleInputNumber(
                                    ev.nativeEvent.target as HTMLInputElement,
                                    target => setMonth(parseInt(target.value))
                                );
                                if (ev.currentTarget.value == '0') {
                                    ev.currentTarget.setCustomValidity(
                                        '월이 1보다 작을 순 없습니다.'
                                    );
                                } else {
                                    ev.currentTarget.setCustomValidity('');
                                }
                            }}
                        />
                        <input
                            type="number"
                            name="day"
                            required
                            placeholder="일"
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                            min="0"
                            max={
                                (year &&
                                    month &&
                                    new Date(year, month, 0).getDate()) ||
                                0
                            }
                            list="day-list"
                            onInput={ev => {
                                handleInputNumber(
                                    ev.nativeEvent.target as HTMLInputElement,
                                    target => setDay(parseInt(target.value))
                                );
                                if (ev.currentTarget.value == '0') {
                                    ev.currentTarget.setCustomValidity(
                                        '일수가 1보다 작을 순 없습니다.'
                                    );
                                } else {
                                    ev.currentTarget.setCustomValidity('');
                                }
                            }}
                            disabled={!year || !month}
                        />
                    </Box>
                </Box>
                <datalist id="year-list">
                    {[
                        ...new Array(
                            new Date().getFullYear() -
                                (new Date().getFullYear() - 122) +
                                1
                        ),
                    ]
                        .reverse()
                        .map((_, i) => (
                            <option
                                value={new Date().getFullYear() - 122 + i}
                                key={i}
                            ></option>
                        ))}
                </datalist>
                <datalist id="month-list">
                    {[...new Array(12)].map((_, i) => (
                        <option value={i + 1} key={i}></option>
                    ))}
                </datalist>
                <datalist id="day-list">
                    {year &&
                        month &&
                        [...new Array(new Date(year, month, 0).getDate())].map(
                            (_, i) => <option value={i + 1} key={i}></option>
                        )}
                </datalist>
                {/* 가입경로 */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">가입경로</FormLabel>
                    <RadioGroup
                        row
                        name="singUpPath"
                        onChange={ev =>
                            setIsCheckEtc(ev.target.value === 'ETC')
                        }
                    >
                        <FormControlLabel
                            value="BLOG"
                            control={<Radio required />}
                            label="블로그"
                        />
                        <FormControlLabel
                            value="YOUTUBE"
                            control={<Radio required />}
                            label="유튜브"
                        />
                        <FormControlLabel
                            value="SEARCH"
                            control={<Radio required />}
                            label="검색"
                        />
                        <FormControlLabel
                            value="FRIEND"
                            control={<Radio required />}
                            label="지인추천"
                        />
                        <FormControlLabel
                            value="ETC"
                            control={<Radio required />}
                            label="기타"
                        />
                    </RadioGroup>
                </FormControl>
                {isCheckEtc && (
                    <FormControl fullWidth variant="outlined">
                        <TextareaAutosize
                            name="singUpPathEtc"
                            placeholder="기타 내용을 입력하세요."
                            minRows={4}
                            style={{
                                width: '100%',
                                padding: '16.5px 14px',
                                borderRadius: '4px',
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                            }}
                        />
                    </FormControl>
                )}
                {/* 프로필 소개 */}
                <FormControl
                    fullWidth
                    variant="outlined"
                    required
                    sx={{ marginTop: 2 }}
                >
                    <FormLabel>프로필 소개</FormLabel>
                    <TextareaAutosize
                        name="profileDescription"
                        placeholder="자기소개를 입력하세요."
                        minRows={4}
                        style={{
                            width: '100%',
                            padding: '16.5px 14px',
                            borderRadius: '4px',
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        }}
                    />
                </FormControl>
                <BlackButton
                    type="submit"
                    variant="contained"
                    sx={{
                        background: '#2e3b55',
                        '&:hover': {
                            background: '#3c4d6e',
                        },
                        '&:active': {
                            background: '#3c4d6e',
                        },
                    }}
                >
                    회원가입
                </BlackButton>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        marginTop: 2,
                        fontSize: '1.3rem',
                        textWrap: 'nowrap',
                    }}
                >
                    회원가입
                </Button>
            </Box>
        </form>
    );
};
