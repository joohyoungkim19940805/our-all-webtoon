import { button } from '@components/button/Button';
import closeSvg from '@svg/close.svg';
import { Subject, map } from 'rxjs';

// 북마크 목록 버튼
export const closeButton = (layer : HTMLDivElement) => button(
	{
        event:{
            onclick: ()=> layer.isConnected && layer.remove()
        }
    },
	{svg: closeSvg}
).pipe(map(close=>{
	return close;
}));