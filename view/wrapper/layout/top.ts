import { headContainer } from "@container/head/HeadContainer";
import common from "@handler/common";
import { windowResize } from "@handler/globalEvents";
import { FlexContainer } from "@wrapper/FlexLayout";
import { Observable, from, map, zip } from "rxjs";
//탑이 광고역할 및 검색 역할 드가야함
let aa=`
	<div data-info="광고영역">
		<div data-info="최상단 검색 영역 및 이벤트">
			
		</div>
		<div data-info="이달의 추천"></div>
		<div>
			<div data-info="검색 영역" 
			data-descripse="약 85~95% width 비율 type search">
			</div>
		</div>
		<div>
		{{광고스크립트 영역}}
		</div>
	<div>
`

export type TopPageLayout = {
	top: FlexContainer,
	search: HTMLInputElement
}

const $top : Observable<FlexContainer> = from(
	new Promise<FlexContainer>(res => {
		let top = new FlexContainer();
		top.dataset.grow = '0.08'
		top.dataset.is_resize = 'false';
		top.panelMode = 'center-cylinder-reverse';
		res(top);
	})
)

export const top = zip($top, headContainer).pipe(map( ([ top, {headContainer, recommendContainer, searchAndMenuContainer} ]) => {
	//bottom.append(gnbContainer)
	top.replaceChildren(headContainer);
	top.style.minHeight = searchAndMenuContainer.clientHeight + 'px';
	
	common.renderingAwait(searchAndMenuContainer).then(() => {
		const root = top.getRoot;
		if(! root) return;
		top.dataset.grow = root.mathGrow(searchAndMenuContainer.clientHeight)?.toString();
		top.style.minHeight = '';
		top.style.maxHeight = searchAndMenuContainer.clientHeight + recommendContainer.clientHeight + 'px';
		root.remain()
	})
	windowResize.subscribe(ev=>{
		const root = top.getRoot;
		if(! root) return;
		top.style.maxHeight = searchAndMenuContainer.clientHeight + recommendContainer.clientHeight + 'px';
		top.dataset.grow = root.mathGrow(searchAndMenuContainer.clientHeight)?.toString();
		root.remain()
	})
	return {top, headContainer};
}))
