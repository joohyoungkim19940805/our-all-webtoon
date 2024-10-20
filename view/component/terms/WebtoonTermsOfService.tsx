import FreeWillEditor from '@editor/FreeWillEditor';
import Background from '@editor/tools/Background';
import BulletPoint from '@editor/tools/BulletPoint';
import Color from '@editor/tools/Color';
import FontFamily from '@editor/tools/FontFamily';
import Italic from '@editor/tools/Italic';
import NumericPoint from '@editor/tools/NumericPoint';
import Quote from '@editor/tools/Quote';
import Sort from '@editor/tools/Sort';
import Strikethrough from '@editor/tools/Strikethrough';
import Strong from '@editor/tools/Strong';
import Underline from '@editor/tools/Underline';
import { callApiCache } from '@handler/service/CommonService';
import { WebtoonTermsOfServiceType } from '@type/service/TermsOfServiceType';
import { useEffect, useRef, useState } from 'react';

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
            WebtoonTermsOfServiceEditor
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
        super(
            WebtoonTermsOfServiceEditor.tools,
            WebtoonTermsOfServiceEditor.option
        );
        this.placeholder = '';
        this.isWrite = false;
    }
}

export const WebtoonTermsOfService = () => {
    const [termsTitle, setTermsTitle] = useState<string>();
    const webtoonTermsOfServiceEditorRef =
        useRef<WebtoonTermsOfServiceEditor>(null);
    useEffect(() => {
        if (!webtoonTermsOfServiceEditorRef.current) return;
        webtoonTermsOfServiceEditorRef.current.contentEditable = 'false';
        const subscribe = callApiCache<void, WebtoonTermsOfServiceType>(
            {
                method: 'GET',
                path: 'terms',
                endpoint: 'webtoon-terms',
            },
            { cacheTime: 1000 * 60 * 5, cacheName: 'webtoonTerms' }
        ).subscribe({
            next: terms => {
                if (terms) {
                    setTermsTitle(terms.name);
                    FreeWillEditor.parseLowDoseJSON(
                        webtoonTermsOfServiceEditorRef.current,
                        terms.content,
                        undefined,
                        true
                    );
                }
            },
        });
        /*const subscribe = getWebtoonTermsOfService.subscribe({
            next: (terms) => {
                if (terms) {
                    setTermsTitle(terms.name);
                    FreeWillEditor.parseLowDoseJSON(
                        webtoonTermsOfServiceEditorRef.current,
                        terms.content,
                        undefined,
                        true,
                    );
                }
            },
        });*/

        return () => {
            webtoonTermsOfServiceEditorRef.current?.replaceChildren();
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
