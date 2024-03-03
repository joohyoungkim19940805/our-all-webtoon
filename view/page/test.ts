import { FlexLayout } from "@wrapper/FlexLayout";
import styles from './test3.module.css';
import { bottom } from "@wrapper/layout/bottom";
styles.div

let root = new FlexLayout({id: 'root'});
root.dataset.direction = 'column';

let contentElement = Object.assign(document.createElement('div'),{
	textContent : `test content view`
});

bottom.subscribe(e=>{
	root.replaceChildren(contentElement,e.bottom);
})

root.append(contentElement);

document.body.append(root);
