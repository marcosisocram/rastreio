import X2JS from 'x2js';

export function xml(jsObj) {
	const x2js = new X2JS({stripWhitespaces: false});
	return x2js.js2xml(jsObj);
}
