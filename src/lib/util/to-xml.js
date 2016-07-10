import X2JS from 'x2js';
import document from './../../../envelope.json';

export function toXml(objetos, resultado) {
	document.Envelope.Body.buscaEventosLista.resultado = resultado;
	document.Envelope.Body.buscaEventosLista.objetos = objetos;

	const x2js = new X2JS();
	return x2js.js2xml(document);
}
