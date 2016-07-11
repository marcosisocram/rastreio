import test from 'ava';
import {rastreio} from './../app/lib/rastreio';

test('dados corretos', t => {
	return rastreio(['TE123456785AA'], {resultado: 'ultimo', formato: 'json'})
	.then(data => {
		t.regex(data, /Objeto saiu para entrega/);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('número de rastreamento errado', t => {
	return rastreio(['TE123456185AA'], {resultado: 'ultimo', formato: 'json'})
	.then(data => {
		t.regex(data, /Objeto n.o encontrado na base de dados dos Correios\./);
	});
});

test('resultado errado', t => {
	return rastreio(['TE123456785AA'], {resultado: 'errado', formato: 'json'})
		.catch(err => {
			t.regex(err, /TypeError: Esperado uma das opções u, t, todos ou ultimo como resultado/);
		});
});

test('formato errado', t => {
	return rastreio(['TE123456785AA'], {resultado: 'u', formato: 'errado'})
	.catch(err => {
		t.regex(err, /TypeError: Esperado uma das opções xml, json ou humanize/);
	});
});
