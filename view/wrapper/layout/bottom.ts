import { concat, delay, from, map, mergeMap, zip } from "rxjs";
import { FlexLayout } from "@wrapper/FlexLayout";
import { gnbContainer, latestUpdateButtonEvent } from '@container/gnb/GnbContainer'; 
import { loadingRotate } from "@components/loading/Loading";

const $bottom = zip(
	from(
		new Promise<HTMLDivElement>(res => {
			let bottom = Object.assign(document.createElement('div'), {
				className:"abcd"
			});
			res(bottom);
		})
	), loadingRotate()
)
.pipe(
	map( ([bottom, loading] ) => {
		bottom.append(loading)
		return {bottom, loading};
	}),
);
export const bottom = zip($bottom, gnbContainer).pipe(map( ([ {bottom, loading}, {gnbContainer} ]) => {
	//bottom.append(gnbContainer)
	bottom.replaceChildren(gnbContainer);
	loading.remove();
	return {bottom, gnbContainer}
}))

