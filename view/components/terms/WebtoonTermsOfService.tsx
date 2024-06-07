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
import { useEffect, useRef, useState } from 'react';
import { getWebtoonTermsOfService } from '@handler/service/TermsService';

interface WebtoonTermsOfServiceEditorHTMLAttributes<WebtoonTermsOfServiceEditor>
    extends React.HTMLAttributes<WebtoonTermsOfServiceEditor> {}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'webtoon-terms-of-service-editor': React.DetailedHTMLProps<
                WebtoonTermsOfServiceEditorHTMLAttributes<WebtoonTermsOfServiceEditor>,
                WebtoonTermsOfServiceEditor
            >;
        }
    }
}

class WebtoonTermsOfServiceEditor extends FreeWillEditor {
    static {
        window.customElements.define(
            'webtoon-terms-of-service-editor',
            WebtoonTermsOfServiceEditor,
        );
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
        super();
        super.placeholder = '';
        super.isWrite = false;
    }
}

export const WebtoonTermsOfService = () => {
    const [termsTitle, setTermsTitle] = useState<string>();
    const webtoonTermsOfServiceEditorRef =
        useRef<WebtoonTermsOfServiceEditor>(null);
    useEffect(() => {
        if (!webtoonTermsOfServiceEditorRef.current) return;
        webtoonTermsOfServiceEditorRef.current.contentEditable = 'false';
        const subscribe = getWebtoonTermsOfService().subscribe({
            next: (terms) => {
                if (!webtoonTermsOfServiceEditorRef.current) return;
                if (terms) {
                    FreeWillEditor.parseLowDoseJSON(
                        webtoonTermsOfServiceEditorRef.current,
                        terms.content,
                    );
                    setTermsTitle(terms.name);
                }
            },
        });

        return () => {
            subscribe.unsubscribe();
        };
    }, [webtoonTermsOfServiceEditorRef]);
    return (
        <>
            <div>{termsTitle && <h2>{termsTitle}</h2>}</div>
            <div>
                <webtoon-terms-of-service-editor
                    ref={webtoonTermsOfServiceEditorRef}
                ></webtoon-terms-of-service-editor>
            </div>
        </>
    );
};
