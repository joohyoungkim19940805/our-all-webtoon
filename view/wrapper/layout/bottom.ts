import { Observable, concat, delay, from, map, mergeMap, zip } from "rxjs";
import { FlexLayout } from "@wrapper/FlexLayout";
import { gnbContainer, latestUpdateButtonEvent } from '@container/gnb/GnbContainer'; 
import { loadingRotate } from "@components/loading/Loading";

const $bottom : Observable<HTMLDivElement> = from(
	new Promise<HTMLDivElement>(res => {
		let bottom = Object.assign(document.createElement('div'), {
			className:"abcd"
		});
		res(bottom);
	})
)

export const bottom = zip($bottom, gnbContainer).pipe(map( ([ bottom, {gnbContainer} ]) => {
	//bottom.append(gnbContainer)
	bottom.replaceChildren(gnbContainer);
	return {bottom, gnbContainer}
}))
