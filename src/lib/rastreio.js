import X2JS from 'x2js';
import {request} from './request';
import {xml as _xml} from './formato/xml';
import {json as _json} from './formato/json';
import {humanize as _humanize} from './formato/humanize';

export function rastreio(objetos = [], opcoes = {}) {
	opcoes.resultado = opcoes.resultado.toUpperCase();
	const resultado = ['U', 'T', 'ULTIMO', 'TODOS'].indexOf(opcoes.resultado);
	const formato = ['xml', 'json', 'humanize'].indexOf(opcoes.formato);
	const fun = {xml: _xml, json: _json, humanize: _humanize};

	const pms = new Promise((resolve, reject) => {
		if (resultado < 0) {
			reject(new TypeError('Esperado uma das opções u, t, todos ou ultimo como resultado', 'rastreio'));
		}

		if (formato < 0) {
			reject(new TypeError('Esperado uma das opções xml, json ou humanize', 'rastreio'));
		}

		if (!Array.isArray(objetos)) {
			reject(new TypeError('Esperado um array como primeiro argumento', 'rastreio'));
		}

		request(objetos, opcoes.resultado)
		.then(response => {
			const x2js = new X2JS();
			const document = x2js.xml2js(response);
			return document.Envelope.Body.buscaEventosListaResponse;
		})
		.then(fun[opcoes.formato])
		.then(result => {
			return resolve(result);
		})
		.catch(err => {
			reject(err);
		});
	});

	return pms;
}
