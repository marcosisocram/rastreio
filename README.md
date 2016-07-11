# rastreio
> Saiba onde estão suas encomendas

[![Build Status](https://travis-ci.org/marcosisocram/rastreio.svg?branch=master)](https://travis-ci.org/marcosisocram/rastreio)
[![Coverage Status](https://coveralls.io/repos/github/marcosisocram/rastreio/badge.svg?branch=master)](https://coveralls.io/github/marcosisocram/rastreio?branch=master)
[![Junte-se ao chat em https://gitter.im/marcosisocram/rastreio](https://badges.gitter.im/marcosisocram/rastreio.svg)](https://gitter.im/marcosisocram/rastreio?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

---
## Instalação
```sh
$ npm install --global rastreio
```

## Uso
```sh
$ rastreio <arg> <arg> ... [--json] [--xml] [--humanize] [--ultimo] [--todos]
$ cat <file> | rastreio <--stdin>
```

## Opções
```
  Padrão: --todos --humanize
  --help          Mostra a ajuda
  --version       Mostra a versão
  --todos, -t     Todos os eventos
  --ultimo, -u    Somente o ultimo evento
  --xml, -x       A saida será xml
  --json, -j      A saida será json
  --humanize, -h  A saida será mais "humana"
  --stdin         Entrada padrão
```

## Exemplos
```sh
$ rastreio TE123456785AB
```
```sh
> TE123456785AB - TESTE (OBJETO PARA TREINAMENTO) - OBJETO INTERNACIONAL

  04/02/2016 11:35 EM CDD BELO HORIZONTE, BELO HORIZONTE - MG
  OBJETO ENCAMINHADO  PARA CTCE UBERABA, UBERABA - MG
```
---
```sh
$ rastreio TE123456785AB --json
```
```json
{
  "versao": "2.0",
  "qtd": "1",
  "objeto": {
    "numero": "TE123456785AB",
    "sigla": "TE",
    "nome": "TESTE (OBJETO PARA TREINAMENTO)",
    "categoria": "OBJETO INTERNACIONAL",
    "evento": {
      "tipo": "RO",
      "status": "01",
      "data": "04/02/2016",
      "hora": "11:35",
      "descricao": "Objeto encaminhado",
      "local": "CDD BELO HORIZONTE",
      "codigo": "30107970",
      "cidade": "BELO HORIZONTE",
      "uf": "MG",
      "destino": {
        "local": "CTCE UBERABA",
        "codigo": "38018970",
        "cidade": "UBERABA",
        "bairro": "CENTRO",
        "uf": "MG"
      }
    }
  }
}
```
---
```sh
$ rastreio TE123456785AB --xml
```
```xml
<return>
   <versao>2.0</versao>
   <qtd>1</qtd>
   <objeto>
      <numero>TE123456785AB</numero>
      <sigla>TE</sigla>
      <nome>TESTE (OBJETO PARA TREINAMENTO)</nome>
      <categoria>OBJETO INTERNACIONAL</categoria>
      <evento>
         <tipo>RO</tipo>
         <status>01</status>
         <data>04/02/2016</data>
         <hora>11:35</hora>
         <descricao>Objeto encaminhado</descricao>
         <local>CDD BELO HORIZONTE</local>
         <codigo>30107970</codigo>
         <cidade>BELO HORIZONTE</cidade>
         <uf>MG</uf>
         <destino>
            <local>CTCE UBERABA</local>
            <codigo>38018970</codigo>
            <cidade>UBERABA</cidade>
            <bairro>CENTRO</bairro>
            <uf>MG</uf>
         </destino>
      </evento>
   </objeto>
</return>
```
## Licença

[MIT](http://mp.mit-license.org/) © Marcos Paulo
