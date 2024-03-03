import { from } from "rxjs";
import { FlexLayout } from "@wrapper/FlexLayout";

//top(head), body(content)

export const center = from(
	new Promise<HTMLDivElement>(res => {
		let center = Object.assign(document.createElement('div'), {
			textContent : 'test center'
		});
		res(center);
	})
)