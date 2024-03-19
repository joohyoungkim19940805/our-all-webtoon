import { FlexContainer, FlexLayout } from "@wrapper/FlexLayout";
import styles from './test3.module.css';
import { bottom } from "@wrapper/layout/bottom";
import { accessNavigation, windowResize } from "@handler/globalEvents";
import common from "@handler/common";
import { dimLayer } from "@wrapper/layer/Layer"
import { loginContainer, usernameInput } from "@container/login/LoginContainer";
import { map, zip } from "rxjs";
import { top } from "@wrapper/layout/top";
import {center} from "@wrapper/layout/center";
styles

document.body.dataset.mode = 'black';

let root = new FlexLayout({id: 'root'});
root.dataset.direction = 'column';
document.body.append(root);
zip(top, center, bottom)
.subscribe( ([
	{top}, {center}, {bottom, gnbContainer}
]) => {
	root.replaceChildren(top, center, bottom)
	bottom.style.minHeight = gnbContainer.children[0].clientHeight + 'px';
	bottom.style.maxHeight = gnbContainer.clientHeight + 'px';
	common.renderingAwait(bottom).then(ele=>{
		bottom.dataset.grow = root.mathGrow(gnbContainer.children[0].clientHeight)?.toString();
		bottom.style.minHeight = '';
		root.remain()
	});
	windowResize.subscribe(ev=>{
		bottom.style.maxHeight = gnbContainer.clientHeight + 'px';
		bottom.dataset.grow = root.mathGrow(gnbContainer.children[0].clientHeight)?.toString();
		root.remain()
	})
});


accessNavigation.subscribe(e=>{
	console.log(e);
	setTimeout(()=>{
		zip(dimLayer, loginContainer).subscribe( ( [{layer, layerContainer}, {container, components}] ) => {
			layerContainer.append(container);
			document.body.append(layer);
		})
	},1000)
});

