import { FlexContainer, FlexLayout } from "@wrapper/FlexLayout";
import styles from './test3.module.css';
import { bottom } from "@wrapper/layout/bottom";
import { accessNavigation, windowResize } from "@handler/globalEvents";
import common from "@handler/common";
import { fullLayer } from "@wrapper/layer/Layer"
import { loginContainer, usernameInput } from "@container/login/LoginContainer";
import { map, zip } from "rxjs";
import { top } from "@wrapper/layout/top";
styles

let root = new FlexLayout({id: 'root'});
root.dataset.direction = 'column';
document.body.append(root);
zip(top, bottom)
.subscribe( ([
	{top}
]) => {
	root.replaceChildren(top)
});
