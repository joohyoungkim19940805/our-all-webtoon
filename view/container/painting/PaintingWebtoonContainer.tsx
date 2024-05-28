export const PaintingWebtoonContainer = () => {
    return (
        <div>
            <div data-info="운영원칙">
                <div>
                    <h2>운영원칙</h2>
                </div>
                <div>
                    <span>
                        다른 사람의 저작권을 침해하거나 명예를 훼손하는 경우
                        관렬 법률에 의거 제재받을 수 있습니다.
                    </span>
                </div>
                <div>
                    <span>
                        성인물, 폭렬물 등의 게시물은 별도의 통보 없이 삭제될 수
                        있습니다.
                    </span>
                </div>
                <div>
                    <input type="checkbox"></input>
                    <label>동의합니다.</label>
                </div>
            </div>
            <div>
                <div data-info="작품명">
                    <label></label>
                    <input></input>
                </div>
                <div data-info="장르">
                    <label></label>
                    <ul data-info="wrap overflow 사용">
                        <li></li>
                    </ul>
                </div>
                <div data-info="작품 한 줄 요약 (gpt 사용)">
                    <label></label>
                </div>
                <div data-info="줄거리">
                    <label></label>
                    <div data-info="텍스트 에디터 사용"></div>
                </div>
            </div>
        </div>
    );
};
