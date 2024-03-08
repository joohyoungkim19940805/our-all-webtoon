import { FlexLayout } from "@wrapper/FlexLayout";
import flexLayoutStyle  from "@wrapper/FlexLayout.module.css";
import styles from './test3.module.css';
import { bottom } from "@wrapper/layout/bottom";
import { windowResize } from "@handler/globalEvents";
import common from "@handler/common";
styles.div

let root = new FlexLayout({id: 'root'});
root.dataset.direction = 'column';
document.body.append(root);

let contentElement = Object.assign(document.createElement('div'),{
	textContent : `test content view`
});
contentElement.style.minHeight = '1px'
contentElement.dataset.is_resize = 'true';
contentElement.dataset.panel_mode = 'center-cylinder';
if( (contentElement instanceof FlexLayout)){
	console.log(root)
}
root.append(contentElement);
//console.log('???',flexLayoutStyle["show-helper"], contentElement, (contentElement as any).__resizePanel);
//(contentElement as any).__resizePanel.classList.add(flexLayoutStyle["show-helper"]);
bottom.subscribe(bottomObj=>{
	bottomObj.bottom.dataset.grow = '0.094'
	bottomObj.bottom.dataset.is_resize = 'false';
	
	root.replaceChildren(contentElement, bottomObj.bottom);
	bottomObj.bottom.style.minHeight = bottomObj.gnbContainer.children[0].clientHeight + 'px';
	bottomObj.bottom.style.maxHeight = bottomObj.gnbContainer.clientHeight + 'px';
	common.renderingAwait(bottomObj.bottom).then(ele=>{
		bottomObj.bottom.dataset.grow = root.mathGrow(bottomObj.gnbContainer.children[0].clientHeight)?.toString();
		bottomObj.bottom.style.minHeight = '';
		root.remain()
	});
	windowResize.subscribe(ev=>{
		bottomObj.bottom.style.maxHeight = bottomObj.gnbContainer.clientHeight + 'px';
		bottomObj.bottom.dataset.grow = root.mathGrow(bottomObj.gnbContainer.children[0].clientHeight)?.toString();
		root.remain()
	})
});




let testLayout = Object.assign(document.createElement('div'), {

});
document.body.append()