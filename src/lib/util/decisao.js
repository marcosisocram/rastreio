function decisao(tabela, arr) {
	return tabela.filter(regra => {
		return regra.condicao.toString() === arr.toString();
	});
}

export function formato(flags) {
	const tabela = [
		{condicao: [true, false, false], acao: 'xml'},
		{condicao: [true, false, true], acao: 'xml'},
		{condicao: [true, true, false], acao: 'xml'},
		{condicao: [true, true, true], acao: 'xml'},
		{condicao: [false, true, false], acao: 'json'},
		{condicao: [false, true, true], acao: 'json'},
		{condicao: [false, false, true], acao: 'humanize'},
		{condicao: [false, false, false], acao: 'humanize'}
	];

	const formato = decisao(tabela, [flags.xml, flags.json, flags.humanize]);

	return formato.pop();
}

export function resultado(flags) {
	const tabela = [
		{condicao: [true, true], acao: 't'},
		{condicao: [true, false], acao: 't'},
		{condicao: [false, false], acao: 't'},
		{condicao: [false, true], acao: 'u'}
	];

	const resultado = decisao(tabela, [flags.todos, flags.ultimo]);

	return resultado.pop();
}
