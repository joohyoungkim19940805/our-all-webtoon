import { from } from 'rxjs';

// components -> container -> wrapper

export const longTypeButton = from([
	Object.assign(document.createElement('button'), {
		className:'test2'
	})
])

export const shortTypeButton = from([
	Object.assign(document.createElement('button'), {
		className:'test3'
	})
])