import { headContainer } from "@container/gnb/HeadContainer";
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
		top.dataset.grow = '0.094'
		top.dataset.is_resize = 'false';
		res(top);
	})
)

export const top = zip($top, headContainer).pipe(map( ([ top, {headContainer} ]) => {
	//bottom.append(gnbContainer)
	top.replaceChildren(headContainer);
	return {top, headContainer};
}))
