import { from, of, Observable } from 'rxjs';
import styles from './Button.module.css'
import boxSvg from '@svg/box.svg';

// components -> container -> wrapper

export type ButtonAttribute = {
	type?: 'button' | 'submit'
	textContent?: string
	event?: Partial<GlobalEventHandlers>
}
export type ButtonStyle = {
	size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle'
	styleType?: 'standard'
	animation?: 'spin'
	svg?:string,
	svgPosition?: 'top' | 'bottom' | 'left' | 'right'
};
type SvgPosition = 'svg_top' | 'svg_bottom' | 'svg_left' | 'svg_right'
export const button = ( (
	{type = 'button', textContent, event = {}} : ButtonAttribute,
	{size = 'inherit', styleType = 'standard', animation, svg, svgPosition = 'top'} : ButtonStyle = {},
) => {
	let promise = new Promise<HTMLButtonElement>(res=>{
		let button = Object.assign(document.createElement('button'), {
			className:`${styles.button} ${styles[styleType]} ${styles[size]} ${svg && styles.svg}`,
			type,
			innerHTML: svg || '',
		});
		button.append(document.createTextNode(textContent || ''));
		Object.assign(button, event);
		
		if(svg) button.classList.add(styles[`svg_${svgPosition}` as SvgPosition]);
		

		/*if(animation) {
			button.classList.add(styles[animation]);
		}*/
		res(button);
	})
	return from(promise)
})

export const close = (()=>{

});
