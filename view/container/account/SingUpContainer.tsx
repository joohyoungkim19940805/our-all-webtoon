import inputStyles from '@components/input/Input.module.css';

export const SingUpContainer = () => {
    return (
        <form>
            <div>
                <div data-info="sns sing up"></div>
                <div data-info="forms">
                    <div>
                        <label htmlFor="sign_up_account_name">ID : </label>
                        <input
                            className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                            id="sign_up_account_name"
                            type="text"
                            placeholder="아이디를 입력하세요"
                            autoComplete="username"
                            required
                        ></input>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="sign_up_password">비밀번호</label>
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
                            <label htmlFor="sign_up_password_again">
                                비밀번호 재입력
                            </label>
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
                    <div>
                        <input type="radio"></input>
                        <label>남성</label>

                        <input type="radio"></input>
                        <label>여성</label>

                        <input type="radio"></input>
                        <label>논바이너리</label>
                    </div>
                </div>
            </div>
        </form>
    );
};
