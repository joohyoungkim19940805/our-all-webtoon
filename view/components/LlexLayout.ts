import flexLayout from './FlexLayout.module.css'
/**
 * 
 */
export type FlexDirectionModelType = {
    xy: 'x' | 'y',
    targetDirection: 'left' | 'top',
    sizeName: 'width' | 'height' | keyof DOMRect
    resizeCursor: 'ew-resize' | 'ns-resize'
}

type Movement = {
    x: number,
    y: number
}


export const row: FlexDirectionModelType = {
    xy: 'x',
    targetDirection: 'left',
    sizeName: 'width',
    resizeCursor: 'ew-resize'
}

export const column: FlexDirectionModelType = {
    xy: 'y',
    targetDirection: 'top',
    sizeName: 'height',
    resizeCursor: 'ns-resize'
}

export class FlexLayout extends HTMLElement {

    static get observedAttributes() {
        return ['data-direction'];
    }

    private isLoaded = false;
    private growLimit = 0;



    //#shrinkDefault = 1;
    //#basisDefault = '0%';

    // 가로 모드인 경우 lastElementChild의 리사이즈 제거 필요
    // 세로 모드인 경우 firstElementChild의 리사이즈 제거 필요 
    private growChangeObserver = new MutationObserver((mutationList, observer) => {
        mutationList.forEach((mutation) => {
            const { target: _target } = mutation;
            if (_target.nodeType !== Node.ELEMENT_NODE) {
                return;
            }
            const target = _target as HTMLElement;
            target.style.flex = `${target.dataset.grow || '1'} 1 0%`;
        });
    })

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

            const currentMinSize = parseFloat(currentStyle.getPropertyValue(
                'min' +
                this.direction.sizeName.charAt(0).toUpperCase() +
                this.direction.sizeName.substring(1))
            );

            let currentSize = targetRect[this.direction.sizeName as keyof DOMRect] as number;

            //if( ! isNaN(currentFlexGrow) && ( currentFlexGrow == 0 || (currentSize == 0 || currentMinSize >= currentSize) )){
            if (currentSize == 0 || currentMinSize >= currentSize) {

                // 뷰포트 내에서 해당 영역이 보이지 않는 경우
                target.dataset.flex_visibility = 'h'

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

    private resizeChangeObserver = new MutationObserver((mutationList, observer) => {
        mutationList.forEach((mutation) => {
            const { target: _target } = mutation;
            if (_target.nodeType !== Node.ELEMENT_NODE) {
                return;
            }
            const target = _target as HTMLElement
            if ((target as any).__resizePanel || !target.hasAttribute('data-is_resize')) {
                return;
            }
            const __resizePanel = (target as any).__resizePanel
            __resizePanel.style.display = target.dataset.is_resize == 'true' ? '' : 'none';
        })
    });

    private direction: FlexDirectionModelType = column;

    private forResizeList: Array<HTMLElement> = [];

    private totalMovement = 0;

    private parentSize = 0;

    constructor() {
        super();
        this.addResizePanel(this.children)
        let observer = new MutationObserver((mutationList, observer) => {
            mutationList.forEach((mutation) => this.addResizePanel(mutation.addedNodes))
        })
        observer.observe(this, { childList: true });
    }
    addResizePanel(childElementList: NodeList | HTMLCollection | Array<Element>) {
        if (childElementList instanceof HTMLCollection) {
            childElementList = [...childElementList]
        }
        childElementList.forEach(_childElement => {
            if (_childElement.nodeType != Node.ELEMENT_NODE || (_childElement as Element).classList.contains(flexLayout['flex-resize-panel'])) {
                return;
            }
            const childElement = _childElement as HTMLElement;
            let __resizePanel = (childElement as any).__resizePanel;
            childElement.classList.add(flexLayout['flex-layout-content'])
            let resizePanel = __resizePanel;
            if (!resizePanel) {
                resizePanel = this.#createResizePanel();
                __resizePanel = resizePanel;
                resizePanel.__resizeTarget = childElement;
            }
            childElement.after(resizePanel);

            __resizePanel.style.display = childElement.dataset.is_resize == 'true' ? '' : 'none';

            this.resizeChangeObserver.observe(childElement, {
                attributeFilter: ['data-is_resize'],
                attributeOldValue: true
            });
            this.visibleObserver.observe(childElement, {
                attributeFilter: ['style'],
                attributeOldValue: true
            });
        });
        this.growChangeObserver.disconnect();
        this.forResizeList = [...this.children]
            .filter(e => e.hasAttribute('data-is_resize')) as Array<HTMLElement>;
        this.forResizeList.forEach(e => {
            this.growChangeObserver.observe(e, {
                attributeFilter: ['data-grow'],
            })
        })
        this.growLimit = this.forResizeList.length;
        this.remain();
    }
    connectedCallback() {
        if (!this.isLoaded) {
            this.isLoaded = true;
            /*
            document.addEventListener('DOMContentLoaded', (event) => {
    
            })
            */
        }
    }

    disconnectedCallback() {
        this.isLoaded = false;
    }

    #createResizePanel() {
        // panel_width가 반드시 필요한지 확인 할 것 2023 06 20
        let resizePanel = Object.assign(document.createElement('div'), {
            className: flexLayout['flex-resize-panel'],
            innerHTML: `
				<div class="${flexLayout.hover}">
				</div>
				<div class="panel_width">
				</div>
			`
        });
        this.#addResizePanelEvent(resizePanel);
        return resizePanel;
    }

    /**
     * 
     * @param {HTMLElement} resizePanel 
     */
    #addResizePanelEvent(resizePanel: HTMLElement) {
        this.totalMovement = 0;
        this.parentSize = 0;
        let prevTouchEvent: TouchEvent | undefined;

        new Array('mousedown', 'touchstart').forEach(eventName => {
            resizePanel.addEventListener(eventName, (event) => {
                this.totalMovement = 0;
                prevTouchEvent = undefined;
                this.parentSize = this.getBoundingClientRect()[this.direction.sizeName as keyof DOMRect] as number;
                resizePanel.setAttribute('data-is_mouse_down', '');
                resizePanel.querySelector('.hover')?.setAttribute('data-is_hover', '');
                document.body.style.cursor = this.direction.resizeCursor;
            }, { passive: eventName == 'touchstart' })
        })
        new Array('mouseup', 'touchend').forEach(eventName => {
            window.addEventListener(eventName, (event) => {
                this.totalMovement = 0;
                this.parentSize = 0;
                prevTouchEvent = undefined;
                resizePanel.removeAttribute('data-is_mouse_down');
                resizePanel.querySelector('.hover')?.removeAttribute('data-is_hover');

                if (document.body.style.cursor == 'ew-resize' || document.body.style.cursor == 'ns-resize') {
                    document.body.style.cursor = '';
                }

            })
            resizePanel.addEventListener(eventName, () => {
                resizePanel.removeAttribute('data-is_mouse_down');
                this.totalMovement = 0;
                this.parentSize = 0;
                prevTouchEvent = undefined;
            })
        })
        document.body.onmousemove = (e) => e;
        new Array('mousemove', 'touchmove').forEach(eventName => {
            window.addEventListener(eventName, (event: Event) => {
                if (!resizePanel.hasAttribute('data-is_mouse_down') || !(resizePanel as any).__resizeTarget) {
                    return;
                }
                let move: Movement = { x: 0, y: 0 };
                if (event instanceof TouchEvent) {
                    if (!prevTouchEvent) {
                        prevTouchEvent = (event as TouchEvent);
                        return;
                    }
                    move.x = (prevTouchEvent.touches[0].pageX - event.touches[0].pageX) * -1;
                    move.y = (prevTouchEvent.touches[0].pageY - event.touches[0].pageY) * -1;
                    prevTouchEvent = event;
                } else {
                    move.x = (event as MouseEvent).movementX
                    move.y = (event as MouseEvent).movementY;
                }
                this.moveMouseFlex(resizePanel, move);
            })
        })

    }

    moveMouseFlex(resizePanel: HTMLElement, moveEvent: Movement) {
        return new Promise(resolve => {
            let movement = moveEvent[this.direction.xy];
            this.totalMovement += moveEvent[this.direction.xy];
            const resizeTarget = (resizePanel as any).__resizeTarget as HTMLElement
            let minSizeName = 'min' + this.direction.sizeName.charAt(0).toUpperCase() + this.direction.sizeName.substring(1);

            let targetElement = this.findNotCloseFlexContent(resizeTarget, 'previousElementSibling');
            if (!targetElement || targetElement.dataset.is_resize == 'false' || (resizeTarget.dataset.is_resize == 'true' && 30 < movement)) {
                targetElement = resizeTarget;
            }
            let targetMinSize = parseFloat(window.getComputedStyle(targetElement).getPropertyValue(minSizeName)) || 0;
            let targetRect = targetElement.getBoundingClientRect();
            let targetSize = targetRect[this.direction.sizeName] as number + movement

            let nextElement = this.findNotCloseFlexContent(resizePanel.nextElementSibling, 'nextElementSibling');

            if (!nextElement ||
                targetElement.dataset.is_resize == 'false' ||
                ((resizePanel.nextElementSibling as HTMLElement)?.dataset.is_resize == 'true' && 30 < (movement * -1))
            ) {
                nextElement = resizePanel.nextElementSibling
            }
            let nextElementMinSize = parseFloat(window.getComputedStyle(nextElement).getPropertyValue(minSizeName)) || 0;
            let nextElementRect = nextElement.getBoundingClientRect();
            let nextElementSize = nextElementRect[this.direction.sizeName] + (movement * -1);

            if (this.isOverMove(targetSize, targetMinSize)) {
                nextElementSize = nextElementRect[this.direction.sizeName]
                targetSize = 0;
            } else if (this.isOverMove(nextElementSize, nextElementMinSize)) {
                targetSize = targetRect[this.direction.sizeName];
                nextElementSize = 0;
            }

            let targetFlexGrow = (targetSize / (this.parentSize - 1)) * this.growLimit;
            targetElement.style.flex = `${targetFlexGrow} 1 0%`;
            let nextElementFlexGrow = (nextElementSize / (this.parentSize - 1)) * this.growLimit;
            nextElement.style.flex = `${nextElementFlexGrow} 1 0%`;

            resolve('');
        });
    }
    isOverMove(elementSize: number, elementMinSize: number) {
        return Math.floor(elementSize) <= 0 || (isNaN(elementMinSize) ? false : elementMinSize >= Math.floor(elementSize));
    }

    findNotCloseFlexContent(target: any, direction: string) {
        const isCloseCheck = () => {
            if (target.dataset.is_resize == 'false') {
                return true;
            }
            let grow = parseFloat(window.getComputedStyle(target).flex.split(' ')[0]) || 0;
            if (grow == 0) {
                return true;
            } else {
                return false;
            }
        };
        while (isCloseCheck()) {
            let nextTarget = target[direction]?.[direction];
            if (!nextTarget) {
                break;
            }
            target = nextTarget;
        }
        return target;
    }


    closeFlex(resizeTarget: HTMLElement, { isResize = false } = {}) {
        return new Promise(resolve => {
            if (!resizeTarget.hasAttribute('data-is_resize')) {
                resolve(resizeTarget);
                return;
            } else if (resizeTarget.dataset.is_resize == 'true') {
                resizeTarget.dataset.is_resize = 'false';
            }

            resizeTarget.dataset.prev_grow = this.getGrow(resizeTarget).toString();

            let notCloseList = this.forResizeList.filter(e => e.style.flex != '0 1 0%' && e != resizeTarget);
            let notCloseAndOpenTargetList = [...notCloseList, resizeTarget];
            //let resizeWeight = this.mathWeight(notCloseList, this.forResizeList.length);
            notCloseAndOpenTargetList.forEach(e => {
                e.style.transition = 'flex 0.3s';
                e.ontransitionend = (event) => {
                    if (event.propertyName != 'flex-grow') {
                        return;
                    }
                    e.style.transition = '';
                    e.ontransitionend = () => { };
                    if (e == resizeTarget && (resizeTarget as any)._closeEndCallback) {
                        (resizeTarget as any)._closeEndCallback(this);
                    }
                }

                if (e == resizeTarget) {
                    e.dataset.grow = '0';
                    return;
                }

                if (isResize) {
                    return;
                }

                let percent = this.getGrow(e) / this.forResizeList.length;
                //let percentWeight = this.forResizeList.length * percent;
                //let remainWeight = resizeWeight * percent;
                if (notCloseList.length == 1) {
                    e.dataset.grow = this.forResizeList.length.toString();
                    return;
                }
                e.dataset.grow = (this.forResizeList.length * percent).toString();
            })

            if (isResize) {
                this.resize(notCloseList, this.forResizeList.length);
            }

            resolve(resizeTarget);
        });
    }

    openFlex(resizeTarget: HTMLElement, { isPrevSizeOpen = false, isResize = false } = {}) {
        return new Promise(resolve => {

            if (!resizeTarget.hasAttribute('data-is_resize')) {
                resolve(resizeTarget)
                return;
            } else if (resizeTarget.dataset.is_resize == 'false') {
                resizeTarget.dataset.is_resize = 'true';
            }

            let notCloseList = this.forResizeList.filter(e => e.style.flex != '0 1 0%' && e != resizeTarget);
            let notCloseAndOpenTargetList = [...notCloseList, resizeTarget];
            //let resizeWeight = this.mathWeight(notCloseAndOpenTargetList, this.forResizeList.length);
            let openTargetGrow = 1;
            if (isPrevSizeOpen && resizeTarget.hasAttribute('data-prev_grow')) {
                resizeTarget.dataset.prev_grow;
                openTargetGrow = parseFloat(resizeTarget.dataset.prev_grow || '1') || 1;
                resizeTarget.removeAttribute('data-prev_grow');
            }
            //notCloseList.forEach(e=>{
            notCloseAndOpenTargetList.forEach(e => {
                e.style.transition = 'flex 0.3s';
                e.ontransitionend = (event) => {
                    if (event.propertyName != 'flex-grow') {
                        return;
                    }
                    e.style.transition = '';
                    e.ontransitionend = () => { };
                    if (e == resizeTarget && (resizeTarget as any)._openEndCallback) {
                        (resizeTarget as any)._openEndCallback(this);
                    }
                }

                if (isResize) {
                    return;
                }

                if (e == resizeTarget) {
                    resizeTarget.dataset.grow = openTargetGrow.toString();
                    return;
                }

                let percent = (this.getGrow(e) / this.forResizeList.length) - (openTargetGrow / this.forResizeList.length)
                e.dataset.grow = (this.forResizeList.length * percent).toString();
            });

            if (isResize) {
                this.resize(notCloseAndOpenTargetList, this.forResizeList.length);
            }

            resolve(resizeTarget)
        })
    }

    remain() {
        return new Promise(resolve => {
            let notGrowList: Array<HTMLElement> = [];
            let totalGrow = this.forResizeList.reduce((t, e, i) => {
                if (e.hasAttribute('data-grow') == false) {
                    notGrowList.push(e);
                    return t;
                }
                let grow = parseFloat(e.dataset.grow || '');
                e.style.flex = `${grow} 1 0%`;
                t -= grow;
                return t;
            }, this.growLimit);

            if (notGrowList.length != 0) {
                this.resize(notGrowList, totalGrow);
            }

            resolve(this.forResizeList);
        });
    }

    resize(list: Array<HTMLElement>, totalGrow: number) {
        return new Promise(resolve => {
            //list = list.filter(e=>e.dataset.grow != '0');
            let resizeWeight = this.mathWeight(list, totalGrow)
            list.forEach(e => {
                if (e.hasAttribute('data-grow')) {
                    e.dataset.grow = resizeWeight.toString();
                } else {
                    e.style.flex = `${resizeWeight} 1 0%`;
                }
            });
            resolve(resizeWeight);
        })
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (newValue == 'row') {
            this.direction = row;
        } else if (newValue == 'column') {
            this.direction = column;
        } else {
            throw new Error('direction is "row" or "column" required value');
        }
    }

    mathWeight(list: Array<HTMLElement>, total: number) {
        return 1 + ((total - list.length) / list.length);
    }

    getGrow(growTarget: HTMLElement) {
        return (parseFloat(growTarget.style.flex.split(' ')[0]) || parseFloat(growTarget.dataset.grow || ''));
    }
    isVisible(target: HTMLElement) {
        if (!target.hasAttribute('data-flex_visibility')) {
            throw new Error('is not flex-layout child');
            //return false;
        }

        return target.dataset.flex_visibility == 'v';
    }
}