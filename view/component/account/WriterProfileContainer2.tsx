import { getAccountInfoService } from '@handler/service/AccountService';
import {
    Box,
    Button,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Account } from '@type/service/AccountType';
import { useEffect, useRef, useState } from 'react';

export const WriterProfileContainer = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [account, setAccount] = useState<Account | null>(null);
    const [passwordInputLength, setPasswordInputLength] = useState<number>(0);
    const [gender, setGender] = useState<string>(account?.gender || '');

    // account가 변경될 때 gender 상태 업데이트
    useEffect(() => {
        setGender(account?.gender || '');
    }, [account]);

    useEffect(() => {
        const subscribe = getAccountInfoService().subscribe({
            next: account => {
                if (account) setAccount(account);
            },
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [ref]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            <Typography
                variant="h4"
                sx={{ marginBottom: '2rem', color: '#2e3b55', padding: '2rem' }}
            >
                작가 프로필
            </Typography>
            <form
                ref={ref}
                method="POST"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Grid2
                    sx={{
                        width: '100%',
                        height: '100%',
                        padding: '2rem',
                        gap: '1dvh',
                    }}
                >
                    {/* ID */}
                    <Grid2>
                        <TextField
                            fullWidth
                            label="ID"
                            value={account?.accountName || ''}
                            variant="outlined"
                        />
                    </Grid2>

                    {/* Password */}
                    <Grid2>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            onInput={e => {
                                console.log(e);
                                setPasswordInputLength(1);
                            }}
                            variant="outlined"
                        />
                    </Grid2>

                    {/* Re-enter Password */}
                    {passwordInputLength > 0 && (
                        <Grid2>
                            <TextField
                                fullWidth
                                label="Re-enter Password"
                                type="password"
                                variant="outlined"
                                color="primary"
                            />
                        </Grid2>
                    )}

                    {/* Email */}
                    <Grid2>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            defaultValue={account?.email || ''}
                            variant="outlined"
                            color="primary"
                        />
                    </Grid2>

                    {/* Age */}
                    <Grid2>
                        <TextField
                            fullWidth
                            label="Age"
                            type="number"
                            defaultValue={account?.age || ''}
                            variant="outlined"
                            color="primary"
                        />
                    </Grid2>

                    {/* Gender */}
                    <Grid2>
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={event =>
                                    setGender(event.target.value)
                                }
                                variant="outlined"
                                label="Gender"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="MALE">Male</MenuItem>
                                <MenuItem value="FEMALE">Female</MenuItem>
                                <MenuItem value="NONBINARY">
                                    Non-binary
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>

                    {/* Nickname */}
                    <Grid2>
                        <TextField
                            fullWidth
                            label="Nickname"
                            defaultValue={account?.nickname || ''}
                            variant="outlined"
                            color="primary"
                        />
                    </Grid2>

                    {/* Submit Button */}
                    <Grid2 sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    );
};
