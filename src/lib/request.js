import http from 'http';
import Promise from 'promise';
import {toXml} from './util/to-xml';

export function request(objetos = [], resultado = 'T') {
	const xml = toXml(objetos, resultado);

	const pms = new Promise((resolve, reject) => {
		const options = {
			hostname: 'webservice.correios.com.br',
			// hostname: 'requestb.in',
			port: null,
			path: '/service/rastro',
			// path: '/1dwd3k51',
			method: 'POST',
			headers: {
				'Accept': 'text/xml',
				'Content-length': xml.length,
				'Content-Type': 'text/xml; charset=utf-8',
				'SOAPAction': 'buscaEventosLista'
			}
		};
		let data = '';
		const req = http.request(options, res => {
			// console.log(`STATUS: ${res.statusCode}`);
			// console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
			res.setEncoding('utf8');

			res.on('data',	chunk => {
				data += chunk;
			});
			res.on('end', () => {
				// console.log('No more data in response.')
				resolve(data);
			});
		});

		req.on('error', e => {
			reject(`problem with request: ${e.message}`);
		});

		// write data to request body
		req.write(xml);
		req.end();
	});

	return pms;
}
