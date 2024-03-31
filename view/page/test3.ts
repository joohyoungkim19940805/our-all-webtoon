/*
import { FlexLayout } from "@wrapper/FlexLayout";
import styles from './test3.module.css';

import { gnbContainer } from '@container/gnb/GnbContainer'; 
import { latestUpdateButtonEvent } from "@components/button/fragments/LatestUpdateButton";
styles.div

let root = new FlexLayout({id: 'root'});
root.classList.add(styles.div);
root.dataset.direction = 'row';

let left = Object.assign(document.createElement('div'),{
	textContent : `test left view`
});
let right = Object.assign(document.createElement('div'),{
	textContent : `test right view`
});
let main = Object.assign(document.createElement('div'),{
	textContent : `test main view`
});
[left, main, right].forEach(e=>{
	if(main != e ) e.dataset.grow = '0';
})

root.replaceChildren(left,main,right);
document.body.append(root);

gnbContainer.subscribe(e=>{
	console.log('eeee',e);
	main.append(e.gnbContainer);
})
latestUpdateButtonEvent.subscribe(e=>{
	console.log(e);
})
*/
