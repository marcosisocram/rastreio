import moment from 'moment';

const idioma = 'pt-br';
moment.locale(idioma);
moment.updateLocale(idioma, {
	calendar: {
		lastDay: '[ontem às] HH:mm',
		sameDay: '[hoje às] HH:mm',
		nextDay: '[amanhã às] HH:mm',
		lastWeek: '[último(a)] dddd [às] HH:mm',
		nextWeek: 'dddd [às] HH:mm',
		sameElse: 'DD/MM/YYYY HH:mm'
	}
});

function obj(obj) {
	if (obj.erro) {
		return `> ${obj.numero}\n	${obj.erro}`;
	}

	let eventos = `> ${obj.numero} - ${obj.nome} - ${obj.categoria}\n`;

	if (!Array.isArray(obj.evento)) {
		eventos += eve(obj.evento);
	} else if (Array.isArray(obj.evento)) {
		for (let j = 0; j < obj.evento.length; j++) {
			eventos += eve(obj.evento[j]);
		}
	}

	return eventos;
}

function eve(evento) {
	let eventos = '';
	let end = '';
	let detalhe = '';

	const dia = moment(evento.data + evento.hora,
		'DD/MM/YYYYHH:mm')
	.calendar();

	if (evento.endereco) {
		end = `(${evento.endereco.logradouro} - ${evento.endereco.bairro}, ${evento.endereco.localidade} - ${evento.endereco.uf})`;
	}

	if (evento.detalhe) {
		detalhe = `\n	${evento.detalhe}`;
	}

	eventos += `\n	${dia} em ${evento.local}, ${evento.cidade} - ${evento.uf}\n	${evento.descricao} ${end} ${detalhe}`;

	if (evento.destino) {
		eventos += `para ${evento.destino.local}, ${evento.destino.cidade} - ${evento.destino.uf}`;
	}

	eventos += '\n';

	return eventos;
}

export function humanize(jsObj) {
	let eventos = ``;
	const retn = [];

	jsObj = jsObj.return;

	if (!Array.isArray(jsObj.objeto)) {
		retn.push(obj(jsObj.objeto));
		//
	} else if (Array.isArray(jsObj.objeto)) {
		let i = jsObj.qtd;
		while (i--) {
			eventos = obj(jsObj.objeto[i]);

			retn.push(eventos);
		}
	}

	return (retn.join('\n').toUpperCase());
}
