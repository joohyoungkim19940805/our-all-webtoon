import { Observable, concat, delay, from, map, mergeMap, zip } from "rxjs";
import { FlexContainer, FlexLayout } from "@wrapper/FlexLayout";
import { gnbContainer } from '@container/gnb/GnbContainer'; 
import { loadingRotate } from "@components/loading/Loading";

export interface BottomPageLayout {
	bottom: FlexContainer,
	gnbContainer: HTMLDivElement
}

const $bottom : Observable<FlexContainer> = from(
	new Promise<FlexContainer>(res => {
		let bottom = new FlexContainer({className : 'abcd'});
		bottom.dataset.grow = '0.094'
		bottom.dataset.is_resize = 'false';
		res(bottom);
	})
)

export const bottom = zip($bottom, gnbContainer).pipe(map( ([ bottom, {gnbContainer} ]) => {
	//bottom.append(gnbContainer)
	bottom.replaceChildren(gnbContainer);
	return {bottom, gnbContainer} as BottomPageLayout
}))
