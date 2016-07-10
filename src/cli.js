#!/usr/bin/env node
import getStdin from 'get-stdin';
import meow from 'meow';
import {rastreio} from './lib/rastreio';
import {formato, resultado} from './lib/util/decisao';

const minimistOpcs = {
	boolean: ['xml', 'json', 'humanize', 'ultimo', 'todos', 'stdin'],
	alias: {x: 'xml', j: 'json', h: 'humanize', t: 'todos', u: 'ultimo'},
	default: {humanize: true}
};

const argv = meow(
  `Uso:
    $ rastreio <arg> <arg> ... [--json] [--xml] [--humanize] [--ultimo] [--todos]
    $ cat <file> | rastreio <--stdin>

  Opções:
    Padrão: --todos --humanize
    --help          Mostra a ajuda
    --version       Mostra a versão
    --todos, -t     Todos os eventos
    --ultimo, -u    Somente o ultimo evento
    --xml, -x       A saida será xml
    --json, -j      A saida será json
    --humanize, -h  A saida será mais "humana"
    --stdin         fluxo de entrada

  Exemplo:
    $ rastreio TE123456785AA
    $ rastreio TE123456785AA --json
    $ rastreio TE123456785AA --xml
    $ rastreio TE123456785AA -x
    $ rastreio TE123456785AA TE123456785AB --json
    $ rastreio TE123456785AA --todos
    $ rastreio TE123456785AA TE123456785AB -u -j
    $ cat rastreios.txt | rastreio --stdin
    $ cat rastreios.txt | rastreio --stdin -t -j > rastreios.json`,
	minimistOpcs);

function cli(objs) {
	const f = formato(argv.flags);
	const r = resultado(argv.flags);

	const opcoes = {
		resultado: r.acao,
		formato: f.acao
	};

	rastreio(objs, opcoes)
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.error(err.message);
	});
}

let input = argv.input;
if (argv.flags.stdin) {
	getStdin()
		.then(data => {
			input = data.length ? data : input;
			if (input.length === 0) {
				argv.showHelp();
			}

			cli(input.trim().split('\n'));
		});
} else if (input.length === 0) {
	argv.showHelp();
} else {
	cli(input);
}
