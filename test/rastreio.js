import test from 'ava';
import {rastreio} from './../app/lib/rastreio';

test('dados corretos', t => {
	return rastreio(['JO488220248BR'], {resultado: 'ultimo', formato: 'json'})
	.then(data => {
		t.regex(data.toUpperCase(), /OBJETO POSTADO/);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('número de rastreamento errado', t => {
	return rastreio(['JO488220245BR'], {resultado: 'ultimo', formato: 'json'})
	.then(data => {
		t.regex(data, /Objeto n.o encontrado na base de dados dos Correios\./);
	});
});
//
test('resultado errado', t => {
	return rastreio(['JO488220248BR'], {resultado: 'errado', formato: 'json'})
		.catch(err => {
			t.regex(err, /TypeError: Esperado uma das opções u, t, todos ou ultimo como resultado/);
		});
});

test('formato errado', t => {
	return rastreio(['JO488220248BR'], {resultado: 'u', formato: 'errado'})
	.catch(err => {
		t.regex(err, /TypeError: Esperado uma das opções xml, json ou humanize/);
	});
});
