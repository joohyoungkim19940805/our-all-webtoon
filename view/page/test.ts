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
	e.bottom.dataset.grow = '0.094'
	//e.bottom.dataset.grow = '0.2'
	root.replaceChildren(contentElement, e.bottom);
})

root.append(contentElement);

document.body.append(root);

let testLayout = Object.assign(document.createElement('div'), {

});
document.body.append()