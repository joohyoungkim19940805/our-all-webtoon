import { Grid2, TextField } from '@mui/material';

export const BirthDateInput = ({ register, errors }: any) => {
    return (
        <Grid2>
            <Grid2>
                <TextField
                    fullWidth
                    label="생년"
                    type="number"
                    {...register('year', {
                        required: true,
                        min: 1900,
                        max: new Date().getFullYear(),
                    })}
                    error={!!errors.year}
                />
            </Grid2>
            <Grid2>
                <TextField
                    fullWidth
                    label="월"
                    type="number"
                    {...register('month', { required: true, min: 1, max: 12 })}
                    error={!!errors.month}
                />
            </Grid2>
            <Grid2>
                <TextField
                    fullWidth
                    label="일"
                    type="number"
                    {...register('day', { required: true, min: 1, max: 31 })}
                    error={!!errors.day}
                />
            </Grid2>
        </Grid2>
    );
};
