
/*
document.addEventListener('keydown',(event)=>{
	if(scrollTarget.hasAttribute('data-is_shft')){
		return;
	}
	let {key} = event;
	if(key === 'Shift'){
		scrollTarget.dataset.is_shft = '';
	}
})

document.addEventListener('keyup', (event)=>{
	if( ! scrollTarget.hasAttribute('data-is_shft')){
		return;
	}    
	let {key} = event;
	if(key === 'Shift'){
		scrollTarget.removeAttribute('data-is_shft');
	}
})

scrollTarget.addEventListener('wheel', (event) => {
	if(scrollTarget.hasAttribute('data-is_shft')){
		return;
	}
	//event.preventDefault();
	let {deltaY} = event;
	
	scrollTarget.scrollTo(
		scrollTarget.scrollLeft + deltaY, undefined
	);
	
	// this.#elementMap.chattingHeadJoinedMembers.scrollTo(
	// {
	// 	left: this.#elementMap.chattingHeadJoinedMembers.scrollLeft + deltaY,
	// 	behavior: 'smooth'
	// });
	
}, {passive: true})
*/