import test from 'ava';
import execa from 'execa';

process.chdir('../');

// se esse teste não passar tenho um problema.
test('unicorns', t => {
	return execa('echo', ['unicorns'])
	.then(result => {
		t.regex(result.stdout, /unicorns/);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('help', t => {
	return execa('node', ['./app/cli.js', '--help'])
	.then(result => {
		t.regex(result.stdout, /rastreio <arg> <arg>/);
		t.regex(result.stdout, /Uso:/);
		t.regex(result.stdout, /Exemplo:/);
		t.regex(result.stdout, /cat rastreio\.js |/);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('version', t => {
	return execa('node', ['./app/cli.js', '--version'])
	.then(result => {
		t.regex(result.stdout, /([0-9]{1,}\.?){3}/);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('dados corretos', t => {
	return execa('node', ['./app/cli.js', 'TE123456785AA'])
	.then(result => {
		t.regex(result.stdout.toUpperCase(), /OBJETO SAIU PARA ENTREGA/);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('número de rastreamento errado', t => {
	return execa('node', ['./app/cli.js', 'TE123456185AA'])
	.then(result => {
		t.regex(result.stdout, /OBJETO N.O ENCONTRADO NA BASE DE DADOS DOS CORREIOS\./);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('stdin', t => {
	return execa.shell('echo TE123456785AA | node ./app/cli.js --stdin')
	.then(result => {
		t.regex(result.stdout.toUpperCase(), /OBJETO SAIU PARA ENTREGA/);
	})
	.catch(err => {
		t.fail(err);
	});
});

test('sem stdin', t => {
	return execa.shell('echo TE123456785AA | node ./app/cli.js')
	.then(result => {
		t.regex(result.stdout, /rastreio <arg> <arg>/);
		t.regex(result.stdout, /Uso:/);
		t.regex(result.stdout, /Exemplo:/);
		t.regex(result.stdout, /cat rastreio\.js |/);
	})
	.catch(err => {
		t.fail(err);
	});
});
