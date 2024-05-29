import inputStyles from '@components/input/Input.module.css';
import FreeWillEditor from '@components/editor/FreeWillEditor';
import Strong from '@components/editor/tools/Strong';
import Color from '@components/editor/tools/Color';
import Background from '@components/editor/tools/Background';
import Strikethrough from '@components/editor/tools/Strikethrough';
import Underline from '@components/editor/tools/Underline';
import FontFamily from '@components/editor/tools/FontFamily';
import Quote from '@components/editor/tools/Quote';
import NumericPoint from '@components/editor/tools/NumericPoint';
import BulletPoint from '@components/editor/tools/BulletPoint';
import Sort from '@components/editor/tools/Sort';
import Italic from '@components/editor/tools/Italic';
import toolBarStyles from '@components/editor/toolBar.module.css';
import { useEffect, useRef } from 'react';
import { FlexLayout } from '@wrapper/FlexLayout';
interface SynopsisEditorHTMLAttributes<SynopsisEditor>
    extends React.HTMLAttributes<SynopsisEditor> {}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'synopsis-editor': React.DetailedHTMLProps<
                SynopsisEditorHTMLAttributes<SynopsisEditor>,
                SynopsisEditor
            >;
        }
    }
}
class SynopsisEditor extends FreeWillEditor {
    static {
        window.customElements.define('synopsis-editor', SynopsisEditor);
    }
    static tools = [
        Strong,
        Color,
        Background,
        Strikethrough,
        Underline,
        FontFamily,
        Quote,
        NumericPoint,
        BulletPoint,
        Sort,
        Italic,
    ];

    static option = {
        isDefaultStyle: true,
    };
    constructor() {
        super(SynopsisEditor.tools, SynopsisEditor.option);
        super.placeholder = '스토리를 입력하세요.';
    }
}

export const PaintingWebtoonContainer = () => {
    const synopsisEditorRef = useRef<SynopsisEditor>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!synopsisEditorRef.current || !toolbarRef.current) return;
        console.log(SynopsisEditor.tools);
        toolbarRef.current.append(
            ...SynopsisEditor.tools.map((e) => e.toolHandler.toolButton),
        );
    }, [synopsisEditorRef, toolbarRef]);
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
                        성인물, 폭력물 등의 게시물은 별도의 통보 없이 삭제될 수
                        있습니다.
                    </span>
                </div>
                <div>
                    <input id="agree_promise" type="checkbox"></input>
                    <label htmlFor="agree_promise">동의합니다.</label>
                </div>
            </div>
            <div>
                <div data-info="작품명">
                    <label>작품 이름</label>
                    <input
                        type="text"
                        placeholder="작품 이름"
                        id="webtoon_title"
                        name="title"
                        className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                    ></input>
                </div>
                <div data-info="장르">
                    <label></label>
                    <ul data-info="wrap overflow 사용">
                        <li></li>
                    </ul>
                </div>
                <div data-info="작품 한 줄 요약 (gpt 사용)">
                    <label htmlFor="webtoon_summary">한 줄 요약</label>
                    <input
                        type="text"
                        id="webtoon_summary"
                        name="summary"
                        placeholder="자동으로 채워집니다."
                        readOnly
                    ></input>
                </div>
                <div data-info="줄거리">
                    <div
                        className={`${toolBarStyles.toolbar}`}
                        ref={toolbarRef}
                    ></div>
                    <synopsis-editor ref={synopsisEditorRef}></synopsis-editor>
                </div>
            </div>
        </div>
    );
};
