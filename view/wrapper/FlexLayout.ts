export interface FlexLayoutHTMLAttributes<FlexLayout>
    extends React.HTMLAttributes<FlexLayout> {
    ['data-direction']: 'row' | 'column';
}
export interface FlexContainerHTMLAttributes<FlexContainer>
    extends React.HTMLAttributes<FlexContainer> {
    ['data-is_resize']: boolean;
    ['data-panel_mode']?: ResizePanelMode;
    ['data-grow']?: number;
    ['data-prev_grow']?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'flex-layout': React.DetailedHTMLProps<
                FlexLayoutHTMLAttributes<FlexLayout>,
                FlexLayout
            >;
            'flex-container': React.DetailedHTMLProps<
                FlexContainerHTMLAttributes<FlexContainer>,
                FlexContainer
            >;
            'flex-resizer': React.DetailedHTMLProps<
                React.HTMLAttributes<FlexResizePanel>,
                FlexResizePanel
            >;
        }
    }
}
import flexLayout from './FlexLayout.module.css';

/**
 *
 */
export type FlexDirectionModelType = {
    xy: 'x' | 'y';
    targetDirection: 'left' | 'top';
    sizeName: 'width' | 'height' | keyof DOMRect;
    resizeCursor: 'ew-resize' | 'ns-resize';
};

export type ResizePanelMode =
    | 'default'
    | 'center-cylinder'
    | 'center-cylinder-reverse';

type Movement = {
    x: number;
    y: number;
};

//type SizeStyleName = 'minWidth' | 'minHeight' | 'clientWidth' | 'clientHeight';

export const row: FlexDirectionModelType = {
    xy: 'x',
    targetDirection: 'left',
    sizeName: 'width',
    resizeCursor: 'ew-resize',
};

export const column: FlexDirectionModelType = {
    xy: 'y',
    targetDirection: 'top',
    sizeName: 'height',
    resizeCursor: 'ns-resize',
};

export class FlexLayout extends HTMLElement {
    static {
        window.customElements.define('flex-layout', this);
    }
    static get observedAttributes() {
        return ['data-direction'];
    }

    #isLoaded = false;
    #growLimit = 0;
    #direction: FlexDirectionModelType = column;
    #forResizeList: Array<HTMLElement> = [];
    //#totalMovement = 0;

    #parentSize = 0;

    #flexChildMapper = {};
    get flexChildMapper() {
        return this.#flexChildMapper;
    }

    //#shrinkDefault = 1;
    //#basisDefault = '0%';

    // 가로 모드인 경우 lastElementChild의 리사이즈 제거 필요
    // 세로 모드인 경우 firstElementChild의 리사이즈 제거 필요
    private growChangeObserver = new MutationObserver(
        (mutationList, observer) => {
            mutationList.forEach((mutation) => {
                const { target: _target } = mutation;
                if (_target.nodeType !== Node.ELEMENT_NODE) {
                    return;
                }
                const target = _target as HTMLElement;
                target.style.flex = `${target.dataset.grow || '1'} 1 0%`;
            });
        },
    );

    private visibleObserver = new MutationObserver((mutationList, observer) => {
        // 정해진 방향의 사이즈만(width or height) 0일뿐 다른 다른 방향 사이즈는 그대로여서
        // 가시성 영역 체크 코드가 미동작하여 추가
        mutationList.forEach((mutation) => {
            const { target: _target } = mutation;
            if (_target.nodeType !== Node.ELEMENT_NODE) {
                return;
            }
            const target = _target as HTMLElement;
            const targetRect = target.getBoundingClientRect();
            const currentFlexGrow = parseFloat(target.style.flex.split(' ')[0]);
            const currentStyle = window.getComputedStyle(target);

            const currentMinSize = parseFloat(
                currentStyle.getPropertyValue(
                    'min' +
                        this.#direction.sizeName.charAt(0).toUpperCase() +
                        this.#direction.sizeName.substring(1),
                ),
            );

            let currentSize = targetRect[
                this.#direction.sizeName as keyof DOMRect
            ] as number;

            //if( ! isNaN(currentFlexGrow) && ( currentFlexGrow == 0 || (currentSize == 0 || currentMinSize >= currentSize) )){
            if (currentSize == 0 || currentMinSize >= currentSize) {
                // 뷰포트 내에서 해당 영역이 보이지 않는 경우
                target.dataset.flex_visibility = 'h';

                /*if(target.hasAttribute('data-is_visibility')){
                    target.style.visibility = 'hidden';
                    target.style.opacity = 0;
                }*/
                //target.dataset.grow = 0;
                //20240222 수정 보류로 주석처리
                /*if (target._visibilityChangeCallback) {
                    target._visibilityChangeCallback(target.dataset.flex_visibility)
                }*/
            } else {
                // 뷰포트 내에서 보이는 경우
                target.dataset.flex_visibility = 'v';
                /*if(target.hasAttribute('data-is_visibility')){
                    target.style.visibility = '';
                    target.style.opacity = '';
                }*/
                //20240222 수정 보류로 주석처리
                /*if (target._visibilityChangeCallback) {
                    target._visibilityChangeCallback(target.dataset.flex_visibility)
                }*/
            }
        });
    });

    constructor(test: any = undefined) {
        super();
        //Object.assign(this, attribute);
        this.addResizePanel(this.children);
        let observer = new MutationObserver((mutationList, observer) => {
            mutationList.forEach((mutation) =>
                this.addResizePanel(mutation.addedNodes),
            );
        }).observe(this, { childList: true });
    }
    addResizePanel(
        childElementList: NodeList | HTMLCollection | Array<Element>,
    ) {
        if (childElementList instanceof HTMLCollection) {
            childElementList = [...childElementList];
        }
        childElementList.forEach((childElement) => {
            /*if (_childElement.nodeType != Node.ELEMENT_NODE || (_childElement as Element).classList.contains(flexLayout['flex-resize-panel'])) {
                return;
            }*/

            if (!(childElement instanceof FlexContainer)) {
                if (!(childElement instanceof FlexResizePanel))
                    this.removeChild(childElement);

                return;
            }
            childElement.root = this;
            let resizePanel = childElement.resizePanel;

            this.#addResizePanelEvent(resizePanel);

            childElement.after(resizePanel);

            this.visibleObserver.observe(childElement, {
                attributeFilter: ['style'],
                attributeOldValue: true,
            });
        });
        this.growChangeObserver.disconnect();
        this.#forResizeList = [...this.children].filter((e) =>
            e.hasAttribute('data-is_resize'),
        ) as Array<HTMLElement>;
        this.#forResizeList.forEach((e) => {
            this.growChangeObserver.observe(e, {
                attributeFilter: ['data-grow'],
            });
        });
        this.#growLimit = this.#forResizeList.length;
        this.remain();
    }
    connectedCallback() {
        /*
        if (!this.#isLoaded) {
            this.#isLoaded = true;
            
            document.addEventListener('DOMContentLoaded', (event) => {
    
            })
            
        }
        */
    }

    disconnectedCallback() {
        this.#isLoaded = false;
    }

    /**
     *
     * @param {FlexResizePanel} resizePanel
     */
    #addResizePanelEvent(resizePanel: FlexResizePanel) {
        //this.#totalMovement = 0;
        this.#parentSize = 0;
        let prevTouchEvent: TouchEvent | undefined;

        new Array('mousedown', 'touchstart').forEach((eventName) => {
            resizePanel.addEventListener(
                eventName,
                (event) => {
                    //this.#totalMovement = 0;
                    prevTouchEvent = undefined;
                    this.#parentSize = this.getBoundingClientRect()[
                        this.#direction.sizeName as keyof DOMRect
                    ] as number;
                    resizePanel.setAttribute('data-is_mouse_down', '');
                    resizePanel
                        .querySelector('.hover')
                        ?.setAttribute('data-is_hover', '');
                    document.body.style.cursor = this.#direction.resizeCursor;
                },
                { passive: eventName == 'touchstart' },
            );
        });
        new Array('mouseup', 'touchend').forEach((eventName) => {
            window.addEventListener(eventName, (event) => {
                //this.#totalMovement = 0;
                this.#parentSize = 0;
                prevTouchEvent = undefined;
                resizePanel.removeAttribute('data-is_mouse_down');
                resizePanel
                    .querySelector('.hover')
                    ?.removeAttribute('data-is_hover');

                if (
                    document.body.style.cursor == 'ew-resize' ||
                    document.body.style.cursor == 'ns-resize'
                ) {
                    document.body.style.cursor = '';
                }
            });
            resizePanel.addEventListener(eventName, () => {
                resizePanel.removeAttribute('data-is_mouse_down');
                //his.#totalMovement = 0;
                this.#parentSize = 0;
                prevTouchEvent = undefined;
            });
        });
        document.body.onmousemove = (e) => e;
        new Array('mousemove', 'touchmove').forEach((eventName) => {
            window.addEventListener(eventName, (event: Event) => {
                if (!resizePanel.hasAttribute('data-is_mouse_down')) {
                    return;
                }
                let move: Movement = { x: 0, y: 0 };
                if (window.TouchEvent && event instanceof TouchEvent) {
                    if (!prevTouchEvent) {
                        prevTouchEvent = event as TouchEvent;
                        return;
                    }
                    move.x =
                        (prevTouchEvent.touches[0].pageX -
                            event.touches[0].pageX) *
                        -1;
                    move.y =
                        (prevTouchEvent.touches[0].pageY -
                            event.touches[0].pageY) *
                        -1;
                    prevTouchEvent = event;
                } else {
                    move.x = (event as MouseEvent).movementX;
                    move.y = (event as MouseEvent).movementY;
                }
                this.moveMouseFlex(resizePanel, move);
            });
        });
    }

    moveMouseFlex(resizePanel: FlexResizePanel, moveEvent: Movement) {
        return new Promise((resolve) => {
            let movement = moveEvent[this.#direction.xy];
            movement = movement;
            //this.#totalMovement += moveEvent[this.#direction.xy];
            const resizeTarget = resizePanel.resizeTarget;
            const minSizeName = 'min-' + this.#direction.sizeName;
            const maxSizeName = 'max-' + this.#direction.sizeName;
            let targetElement = this.findNotCloseFlexContent(
                resizeTarget,
                'previousElementSibling',
            ) as FlexContainer;
            if (
                !targetElement ||
                !targetElement.isResize ||
                (resizeTarget.isResize && 30 < movement)
            ) {
                targetElement = resizeTarget;
            }

            if (!targetElement) return;
            const targetRect = targetElement.getBoundingClientRect();
            const targetStyle = window.getComputedStyle(targetElement);
            const targetMinSize =
                parseFloat(targetStyle.getPropertyValue(minSizeName)) || 0;
            const targetMaxSize =
                parseFloat(targetStyle.getPropertyValue(maxSizeName)) || 0;
            let targetSize =
                (targetRect[this.#direction.sizeName] as number) + movement;
            if (targetMaxSize != 0 && targetSize >= targetMaxSize) {
                return;
                //targetSize = targetMaxSize;
            }

            let nextElement = this.findNotCloseFlexContent(
                resizePanel.nextElementSibling as FlexContainer,
                'nextElementSibling',
            );
            if (
                !nextElement ||
                !targetElement.isResize ||
                ((resizePanel.nextElementSibling as FlexContainer)?.isResize &&
                    30 < movement * -1)
            ) {
                nextElement = resizePanel.nextElementSibling as FlexContainer;
            }

            if (!nextElement) return;

            const nextElementRect = nextElement.getBoundingClientRect();
            const nextElementStyle = window.getComputedStyle(nextElement);
            const nextElementMinSize =
                parseFloat(nextElementStyle.getPropertyValue(minSizeName)) || 0;
            const nextElementMaxSize =
                parseFloat(nextElementStyle.getPropertyValue(maxSizeName)) || 0;
            let nextElementSize =
                (nextElementRect[this.#direction.sizeName] as number) +
                movement * -1;
            if (
                nextElementMaxSize != 0 &&
                nextElementSize >= nextElementMaxSize
            ) {
                //nextElementSize = nextElementMaxSize;
                return;
            }

            if (this.isOverMove(targetSize, targetMinSize)) {
                nextElementSize = nextElementRect[
                    this.#direction.sizeName
                ] as number;
                targetSize = 0;
            } else if (this.isOverMove(nextElementSize, nextElementMinSize)) {
                targetSize = targetRect[this.#direction.sizeName] as number;
                nextElementSize = 0;
            }

            let targetFlexGrow =
                (targetSize / (this.#parentSize - 1)) * this.#growLimit;
            targetElement.style.flex = `${targetFlexGrow} 1 0%`;
            let nextElementFlexGrow =
                (nextElementSize / (this.#parentSize - 1)) * this.#growLimit;
            nextElement.style.flex = `${nextElementFlexGrow} 1 0%`;

            resolve('');
        });
    }
    isOverMove(elementSize: number, elementMinSize: number) {
        return (
            Math.floor(elementSize) <= 0 ||
            (isNaN(elementMinSize)
                ? false
                : elementMinSize >= Math.floor(elementSize))
        );
    }

    findNotCloseFlexContent(target: FlexContainer, direction: string) {
        const isCloseCheck = () => {
            if (!target) return false;
            if (target.dataset.is_resize == 'false') {
                return true;
            }
            let grow =
                parseFloat(
                    window.getComputedStyle(target).flex.split(' ')[0],
                ) || 0;
            if (grow == 0) {
                return true;
            } else {
                return false;
            }
        };
        while (isCloseCheck()) {
            let nextTarget = (target as any)[direction]?.[direction];
            if (!(nextTarget instanceof FlexContainer)) {
                break;
            }
            if (!nextTarget) {
                break;
            }
            target = nextTarget;
        }
        return target;
    }

    closeFlex(resizeTarget: FlexContainer, { isResize = false } = {}) {
        return new Promise((resolve) => {
            if (!resizeTarget.hasAttribute('data-is_resize')) {
                resolve(resizeTarget);
                return;
            } else if (resizeTarget.dataset.is_resize == 'true') {
                resizeTarget.dataset.is_resize = 'false';
            }

            resizeTarget.dataset.prev_grow =
                this.getGrow(resizeTarget).toString();

            let notCloseList = this.#forResizeList.filter(
                (e) => e.style.flex != '0 1 0%' && e != resizeTarget,
            );
            let notCloseAndOpenTargetList = [...notCloseList, resizeTarget];
            //let resizeWeight = this.mathWeight(notCloseList, this.#forResizeList.length);
            notCloseAndOpenTargetList.forEach((e) => {
                e.style.transition = 'flex 0.3s';
                e.ontransitionend = (event) => {
                    if (event.propertyName != 'flex-grow') {
                        return;
                    }
                    e.style.transition = '';
                    e.ontransitionend = () => {};
                    if (e == resizeTarget) {
                        resizeTarget.closeEndCallback(this);
                    }
                };

                if (e == resizeTarget) {
                    e.dataset.grow = '0';
                    return;
                }

                if (isResize) {
                    return;
                }

                let percent = this.getGrow(e) / this.#forResizeList.length;
                //let percentWeight = this.#forResizeList.length * percent;
                //let remainWeight = resizeWeight * percent;
                if (notCloseList.length == 1) {
                    e.dataset.grow = this.#forResizeList.length.toString();
                    return;
                }
                e.dataset.grow = (
                    this.#forResizeList.length * percent
                ).toString();
            });

            if (isResize) {
                this.resize(notCloseList, this.#forResizeList.length);
            }

            resolve(resizeTarget);
        });
    }

    openFlex(
        resizeTarget: FlexContainer,
        { isPrevSizeOpen = false, isResize = false } = {},
    ) {
        return new Promise((resolve) => {
            if (!resizeTarget.hasAttribute('data-is_resize')) {
                resolve(resizeTarget);
                return;
            } else if (resizeTarget.dataset.is_resize == 'false') {
                resizeTarget.dataset.is_resize = 'true';
            }

            let notCloseList = this.#forResizeList.filter(
                (e) => e.style.flex != '0 1 0%' && e != resizeTarget,
            );
            let notCloseAndOpenTargetList = [...notCloseList, resizeTarget];
            //let resizeWeight = this.mathWeight(notCloseAndOpenTargetList, this.#forResizeList.length);
            let openTargetGrow = 1;
            if (isPrevSizeOpen && resizeTarget.hasAttribute('data-prev_grow')) {
                resizeTarget.dataset.prev_grow;
                openTargetGrow =
                    parseFloat(resizeTarget.dataset.prev_grow || '1') || 1;
                resizeTarget.removeAttribute('data-prev_grow');
            }
            //notCloseList.forEach(e=>{
            notCloseAndOpenTargetList.forEach((e) => {
                e.style.transition = 'flex 0.3s';
                e.ontransitionend = (event) => {
                    if (event.propertyName != 'flex-grow') {
                        return;
                    }
                    e.style.transition = '';
                    e.ontransitionend = () => {};
                    if (e == resizeTarget) {
                        resizeTarget.openEndCallback(this);
                    }
                };

                if (isResize) {
                    return;
                }

                if (e == resizeTarget) {
                    resizeTarget.dataset.grow = openTargetGrow.toString();
                    return;
                }

                let percent =
                    this.getGrow(e) / this.#forResizeList.length -
                    openTargetGrow / this.#forResizeList.length;
                e.dataset.grow = (
                    this.#forResizeList.length * percent
                ).toString();
            });

            if (isResize) {
                this.resize(
                    notCloseAndOpenTargetList,
                    this.#forResizeList.length,
                );
            }

            resolve(resizeTarget);
        });
    }
    remain() {
        return new Promise((resolve) => {
            let notGrowList: Array<HTMLElement> = [];
            let totalGrow = this.#forResizeList.reduce((t, e, i) => {
                if (e.hasAttribute('data-grow') == false) {
                    notGrowList.push(e);
                    return t;
                }
                let grow = parseFloat(e.dataset.grow || '');
                e.style.flex = `${grow} 1 0%`;
                t -= grow;
                return t;
            }, this.#growLimit);

            if (notGrowList.length != 0) {
                this.resize(notGrowList, totalGrow);
            }

            resolve(this.#forResizeList);
        });
    }

    resize(list: Array<HTMLElement>, totalGrow: number) {
        return new Promise((resolve) => {
            //list = list.filter(e=>e.dataset.grow != '0');
            let resizeWeight = this.mathWeight(list, totalGrow);
            list.forEach((e) => {
                if (e.hasAttribute('data-grow')) {
                    e.dataset.grow = resizeWeight.toString();
                } else {
                    e.style.flex = `${resizeWeight} 1 0%`;
                }
            });
            resolve(resizeWeight);
        });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        //if (name === 'data-direction') {
        if (newValue == 'row') {
            this.#direction = row;
        } else if (newValue == 'column') {
            this.#direction = column;
        } else {
            throw new Error('direction is "row" or "column" required value');
        }
        //}
    }

    mathWeight(list: Array<HTMLElement>, total: number) {
        return 1 + (total - list.length) / list.length;
    }

    getGrow(growTarget: HTMLElement) {
        return (
            parseFloat(growTarget.style.flex.split(' ')[0]) ||
            parseFloat(growTarget.dataset.grow || '')
        );
    }

    mathGrow(childSize: number) {
        let parentSize;

        if (this.#direction.sizeName == 'width') {
            parentSize = this.clientWidth;
        } else {
            // if (this.#direction.sizeName == 'height') {
            parentSize = this.clientHeight;
        }

        const childContents = [...this.children].filter((e) =>
            e.classList.contains(flexLayout['flex-layout-content']),
        );

        return childContents.length * (childSize / parentSize);
    }
}

export class FlexContainer extends HTMLElement {
    static {
        window.customElements.define('flex-container', this);
    }
    static get observedAttributes() {
        return ['data-is_resize', 'data-panel_mode'];
    }

    #resizePanel: FlexResizePanel = new FlexResizePanel({}, this);
    get resizePanel() {
        return this.#resizePanel;
    }
    #isResize: boolean = false;
    set isResize(isResize: boolean) {
        if (this.#isResize === isResize) return;
        this.#isResize = isResize;
        this.dataset.is_resize = String(isResize);
        this.#resizePanel.style.display = isResize ? '' : 'none';
    }
    #panelMode?: ResizePanelMode;
    set panelMode(panelMode: ResizePanelMode) {
        if (this.#panelMode === panelMode) return;
        this.#panelMode = panelMode;
        this.dataset.panel_mode = panelMode;
        if (panelMode === 'default') {
            this.#resizePanel.className = flexLayout['flex-resize-panel'];
            return;
        }
        this.#resizePanel.classList.add(flexLayout[panelMode || '']);
    }
    #root: FlexLayout | undefined;
    set root(root: FlexLayout) {
        this.#root = root;
    }
    get getRoot() {
        return this.#root;
    }
    #closeEndCallback: Function = () => {};
    get closeEndCallback() {
        return this.#closeEndCallback;
    }
    set closeEndCallback(callback: Function) {
        console.log('???');
        this.#closeEndCallback = callback;
    }

    #openEndCallback: Function = () => {};
    get openEndCallback() {
        return this.#openEndCallback;
    }
    set openEndCallback(callback: Function) {
        this.#openEndCallback = callback;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue == newValue) return;
        if (name === 'data-is_resize') {
            this.isResize = JSON.parse(newValue);
        } else if (name === 'data-panel_mode') {
            this.panelMode = newValue as ResizePanelMode;
        }
    }
    constructor(attribute: any = {}) {
        super();

        /*if (attribute.hasOwnProperty('className')) {
            this.classList.add(attribute.className);
            delete attribute.className;
        }*/
        //Object.assign(this, attribute);
        //if(.attribute)
    }
    connectedCallback() {
        this.className = flexLayout['flex-layout-content'];
        this.isResize = this.#isResize;
        if (!this.dataset.panel_mode) {
            this.#panelMode = 'default';
        }
        this.#resizePanel.style.display = this.#isResize ? '' : 'none';
    }

    isVisible() {
        return this.dataset.flex_visibility == 'v';
    }
    #getRoot() {
        let root;
        if (!this.#root && this.parentElement instanceof FlexLayout) {
            root = this.parentElement as FlexLayout;
        } else {
            root = this.#root;
        }
        return root;
    }
    openFlex({ isPrevSizeOpen = false, isResize = false } = {}) {
        let root = this.#getRoot();

        if (!root) return;
        root.openFlex(this, { isPrevSizeOpen, isResize });
    }
    closeFlex({ isResize = false } = {}) {
        let root = this.#getRoot();

        if (!root) return;
        root.closeFlex(this, { isResize });
    }
}

export class FlexResizePanel extends HTMLElement {
    static {
        window.customElements.define('flex-resizer', this);
    }

    #resizeTarget: FlexContainer;
    get resizeTarget() {
        return this.#resizeTarget;
    }
    #html = (() => {
        let hover = document.createElement('div');
        let panelWidth = document.createElement('div');
        hover.classList.add(flexLayout.hover);
        return [hover, panelWidth];
    })();

    constructor(attribute: any = {}, resizeTarget: FlexContainer) {
        super();
        this.className = flexLayout['flex-resize-panel'];
        this.#resizeTarget = resizeTarget;
        /*if (attribute.hasOwnProperty('className')) {
            this.classList.add(attribute.className);
            delete attribute.className;
        }*/
        //Object.assign(this, attribute);
    }
    connectedCallback() {
        this.replaceChildren(...this.#html);
    }
}
