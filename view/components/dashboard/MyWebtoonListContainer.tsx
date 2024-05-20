import styles from './MyWebtoonListContainer.module.css';

export const MyWebtoonListContainer = () => {
    return (
        <flex-layout data-direction="column">
            <flex-container
                data-is_resize={false}
                data-panel_mode="default"
                data-grow={0.5}
            >
                <div className={`${styles['add-webtoon-container']}`}>
                    <span>
                        <h2>+</h2>
                    </span>
                    <button>웹툰 등록하기</button>
                </div>
            </flex-container>
            <flex-container
                data-is_resize={false}
                data-panel_mode="default"
                data-grow={0.3}
            >
                <div
                    className={`${styles['my-webtoon-list']} ${styles['head']}`}
                >
                    <div>썸네일</div>
                    <div>제목</div>
                    <div>최신 회차 등록일</div>
                    <div>다음 연재 예정일</div>
                    <div>누적 조회수</div>
                </div>
            </flex-container>
            <flex-container data-is_resize={false} data-panel_mode="default">
                <div
                    className={`${styles['my-webtoon-list']} ${styles['body']}`}
                >
                    <div>
                        <img src=""></img>
                    </div>
                    <div>
                        <span>제목</span>
                    </div>
                    <div>최신 회차 등록일</div>
                    <div>다음 연재 예정일</div>
                    <div>누적 조회수</div>
                </div>
            </flex-container>
        </flex-layout>
    );
};