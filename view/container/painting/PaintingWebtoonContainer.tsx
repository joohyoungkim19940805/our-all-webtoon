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
import { useEffect, useRef, useState } from 'react';
import { FlexLayout } from '@wrapper/FlexLayout';
import styles from './PaintingWebtoonContainer.module.css';
import { Genre } from '@type/service/Genre';
import genreStyles from '@components/genre/genre.module.css';
import { WebtoonTermsOfService } from '@components/terms/WebtoonTermsOfService';
import { callApi, callApiCache } from '@handler/service/CommonService';
import { useNavigate } from 'react-router-dom';
import { WebtoonRegistRqeust } from '@type/service/WebtoonType';

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
        this.placeholder = '스토리를 입력하세요.';
        this.isWrite = true;
    }
}

type PaintingWebtoonFormData = {
    agree: HTMLInputElement;
    webtoonTitle: HTMLInputElement;
    genre: Array<HTMLInputElement>;
    thumbnail: HTMLInputElement;
    summary: HTMLInputElement;
};

export const PaintingWebtoonContainer = () => {
    const synopsisEditorRef = useRef<SynopsisEditor>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const [genre, setGenre] = useState<Array<Genre>>([]);
    const [genreSelectCount, setGenreSelectCount] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (!synopsisEditorRef.current || !toolbarRef.current) return;
        toolbarRef.current.append(
            ...SynopsisEditor.tools.map((e) => e.toolHandler.toolButton),
        );
    }, [synopsisEditorRef, toolbarRef]);
    useEffect(() => {
        const subscribe = callApiCache<void, Array<Genre>>(
            {
                method: 'GET',
                path: 'webtoon',
                endpoint: 'genre',
            },
            { cacheTime: 1000 * 60 * 5, cacheName: 'genreList' },
        ).subscribe({
            next: (genre) => {
                if (genre) {
                    console.log(genre);
                    setGenre(genre);
                }
            },
        });

        return () => {
            subscribe.unsubscribe();
        };
    }, []);
    const [tempThumbnailUrl, setTempThumbnailUrl] = useState<string>();
    let isSubmiting = false;
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        if (!synopsisEditorRef.current || isSubmiting) return;
        isSubmiting = false;
        ev.preventDefault();
        const { agree, webtoonTitle, genre, thumbnail, summary } = (() => {
            const { agree, webtoonTitle, genre, thumbnail, summary } =
                ev.currentTarget;
            return {
                agree,
                webtoonTitle,
                genre,
                thumbnail,
                summary,
            } as PaintingWebtoonFormData;
        })();
        const isThumbnail =
            (thumbnail.files && thumbnail.files?.length != 0) ||
            (tempThumbnailUrl && tempThumbnailUrl != '');
        if (!agree.checked) {
            alert('이용 약관에 동의해주세요.');
            agree.focus();
            isSubmiting = false;
            return;
        } else if (!webtoonTitle.value || webtoonTitle.value.trim() == '') {
            alert('웹툰 제목을 입력해주세요.');
            webtoonTitle.focus();
            isSubmiting = false;
            return;
        } else if ([...genre].filter((e) => e.checked).length == 0) {
            alert('장르는 최소 1개 최대 3개 선택해주십시오.');
            genre[0].focus();
            isSubmiting = false;
            return;
        } else if (
            !isThumbnail &&
            !confirm('웹툰의 대표 이미지가 없습니다.\n그대로 진행하시겠습니까?')
        ) {
            isSubmiting = false;
            return;
        } else if (
            !synopsisEditorRef.current?.textContent ||
            synopsisEditorRef.current?.textContent?.trim() == ''
        ) {
            synopsisEditorRef?.current?.focus();
            alert('시눕시스를 작성해주십시오.');
            isSubmiting = false;
            return;
        }
        const subscribe = callApi<WebtoonRegistRqeust, string>({
            method: 'POST',
            path: 'webtoon',
            endpoint: 'content',
            body: {
                agree: agree.checked,
                webtoonTitle: webtoonTitle.value,
                synopsis: await FreeWillEditor.getLowDoseJSON(
                    synopsisEditorRef.current,
                ),
                genre: [...genre].filter((e) => e.checked).map((e) => e.value),
                thumbnailExtension:
                    (isThumbnail &&
                        thumbnail.files &&
                        thumbnail.files[0].name.substring(
                            thumbnail.files[0].name.lastIndexOf('.'),
                        )) ||
                    undefined,
            },
        }).subscribe({
            next: (thumbnailUploadUrl) => {
                console.log(thumbnailUploadUrl);
                if (!thumbnailUploadUrl) return;
                const file =
                    (thumbnail.files && thumbnail.files[0]) || undefined;
                if (!file) {
                    navigate('/dashboard');
                    isSubmiting = false;
                    return;
                }

                fetch(thumbnailUploadUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Encoding': 'base64',
                        'Content-Type': 'application/octet-stream',
                    },
                    body: file,
                })
                    .then((res) => {
                        console.log('res???', res);
                        if (!(res.status == 200 || res.status == 201)) {
                            alert(
                                '썸네일 이미지 업로드에 실패하였습니다.\n수정 화면에서 다시 시도해주십시오.',
                            );
                        }
                        isSubmiting = false;
                        navigate('/dashboard');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            },
            complete: () => {
                console.log('aa');
                isSubmiting = false;
                subscribe.unsubscribe();
            },
            error: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <form
            id="painting-webtoon-container"
            className={`${styles['painting-webtoon-container']}`}
            onSubmit={handleSubmit}
        >
            <div>
                <WebtoonTermsOfService></WebtoonTermsOfService>
                <div>
                    <input
                        id="agree_promise"
                        name="agree"
                        type="checkbox"
                    ></input>
                    <label htmlFor="agree_promise">동의합니다.</label>
                </div>
            </div>
            <div
                data-info="웹툰 내용 등록"
                className={`${styles['painting-webtoon-content']}`}
            >
                <div className={`${styles['webtoon-detail']}`}>
                    <div data-info="작품명">
                        <label>작품 이름</label>
                        <input
                            type="text"
                            placeholder="작품 이름"
                            id="webtoon_title"
                            name="webtoonTitle"
                            className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        ></input>
                    </div>
                    <div data-info="장르">
                        <label>최대 3개까지 선택 가능합니다.</label>
                        <ul
                            className={`${styles['genre-list']}`}
                            data-info="wrap overflow 사용"
                        >
                            {genre &&
                                genre.map((e, i) => (
                                    <li key={i}>
                                        <input
                                            type="checkbox"
                                            id={`genre_${i}`}
                                            name="genre"
                                            value={e.name}
                                            onChange={(ev) => {
                                                console.log(genreSelectCount);
                                                if (genreSelectCount >= 3) {
                                                    ev.currentTarget.checked =
                                                        false;
                                                    alert(
                                                        '장르는 최대 3개까지 선택 가능합니다.',
                                                    );
                                                    return;
                                                }
                                                setGenreSelectCount(
                                                    ev.target.checked
                                                        ? genreSelectCount + 1
                                                        : genreSelectCount - 1,
                                                );
                                            }}
                                        ></input>
                                        <label htmlFor={`genre_${i}`}>
                                            {e.name}
                                        </label>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div data-info="썸네일">
                        <label>썸네일</label>
                        <input
                            id="webtoon_thumbnail"
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                            onInput={(ev) => {
                                if (
                                    !(ev.target instanceof HTMLInputElement) ||
                                    !ev.target.files ||
                                    ev.target.files.length == 0
                                )
                                    return;

                                const url = URL.createObjectURL(
                                    ev.target.files[0],
                                );
                                setTempThumbnailUrl(url);
                                setTimeout(() => {
                                    URL.revokeObjectURL(url);
                                }, 1000);
                                //ev.nativeEvent.
                                //URL.createObjectURL(ev.target);
                            }}
                        ></input>
                        {tempThumbnailUrl && (
                            <img
                                className={`${styles.thumbnail}`}
                                src={tempThumbnailUrl}
                            ></img>
                        )}
                    </div>
                    <div data-info="작품 한 줄 요약 (gpt 사용)">
                        <label htmlFor="webtoon_summary">한 줄 요약</label>
                        <input
                            type="text"
                            id="webtoon_summary"
                            name="summary"
                            placeholder="자동으로 채워집니다."
                            readOnly
                            tabIndex={-1}
                            className={`${inputStyles.input} ${inputStyles['bright-purple']}`}
                        ></input>
                    </div>
                    <div
                        data-info="등록 버튼"
                        className={`${styles['submit-container']}`}
                    >
                        <button type="submit">등록</button>
                    </div>
                    <div
                        data-info="줄거리"
                        className={`${styles['synopsis-container']}`}
                    >
                        <div
                            className={`${toolBarStyles.toolbar}`}
                            ref={toolbarRef}
                        ></div>
                        <synopsis-editor
                            ref={synopsisEditorRef}
                        ></synopsis-editor>
                    </div>
                </div>
            </div>
        </form>
    );
};
