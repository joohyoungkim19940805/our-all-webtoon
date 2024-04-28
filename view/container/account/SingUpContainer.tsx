import inputStyles from '@components/input/Input.module.css';
import styles from './SingUpContainer.module.css';
export const SingUpContainer = () => {
    return (
        <form className={styles['sing-up-container']}>
            <div>
                <label htmlFor="sign_up_account_name">ID </label>
                <input
                    className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                    id="sign_up_account_name"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    autoComplete="username"
                    required
                ></input>
            </div>
            <div className={styles['password-container']}>
                <div>
                    <label htmlFor="sign_up_password">PW </label>
                    <input
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        id="sign_up_password"
                        type="text"
                        placeholder="비밀번호를 입력하세요"
                        autoComplete="current-password"
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="sign_up_password_again">RE </label>
                    <input
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        id="sign_up_password_again"
                        type="text"
                        placeholder="비밀번호를 다시 입력하세요"
                        autoComplete="current-password"
                        required
                    ></input>
                </div>
            </div>
            <div className={styles['sex-container']}>
                <input type="radio" id="sex-male" name="sex" hidden></input>
                <label htmlFor="sex-male">남성</label>

                <input type="radio" id="sex-female" name="sex" hidden></input>
                <label htmlFor="sex-female">여성</label>

                <input
                    type="radio"
                    id="sex-nonbinary"
                    name="sex"
                    hidden
                ></input>
                <label htmlFor="sex-nonbinary">논바이너리</label>
            </div>
        </form>
    );
};
