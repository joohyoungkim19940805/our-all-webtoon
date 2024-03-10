import { FlexContainer, FlexLayout } from "@wrapper/FlexLayout";
import styles from './test3.module.css';
import { bottom } from "@wrapper/layout/bottom";
import { windowResize } from "@handler/globalEvents";
import common from "@handler/common";
import { fullLayer } from "@wrapper/layer/Layer"
import { loginContainer, usernameInput } from "@container/login/LoginContainer";
import { zip } from "rxjs";
styles

let root = new FlexLayout({id: 'root'});
root.dataset.direction = 'column';
document.body.append(root);

let contentElement = new FlexContainer({
	textContent: 'test content view'
});

contentElement.style.minHeight = '1px'
contentElement.dataset.is_resize = 'true';
contentElement.panelMode = 'center-cylinder';

root.append(contentElement);
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


zip(fullLayer, loginContainer).subscribe( ( [{layer, layerContainer}, {container, components}] ) => {
	layerContainer.append(container);
	document.body.append(layer);
})
