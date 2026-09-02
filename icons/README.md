# Zenkai Seti File Icons

Esta pasta contém uma cópia local do tema de ícones Seti distribuído pelo VS Code.
O arquivo `zenkai-seti-icon-theme.json` é o mapa que associa extensões, nomes de
arquivos e linguagens aos ícones; `seti.woff` contém os glifos usados por esse mapa.

## Alterar o ícone de uma linguagem

Para linguagens reconhecidas pelo VS Code, edite `languageIds`. Estes são os
IDs correspondentes aos exemplos mais comuns:

```json
"languageIds": {
  "javascript": "_javascript",
  "html": "_html_3",
  "css": "_css",
  "python": "_python",
  "typescript": "_typescript"
}
```

Para forçar o ícone pela extensão do arquivo, independentemente da linguagem
detectada, use `fileExtensions`. As chaves não incluem o ponto:

```json
"fileExtensions": {
  "js": "_javascript",
  "html": "_html_3",
  "css": "_css",
  "py": "_python",
  "ts": "_typescript"
}
```

Se alterar `fileExtensions`, faça a mesma alteração em `light.fileExtensions`,
usando a versão do ícone com sufixo `_light`.

O VS Code dá preferência a `fileNames`, depois a `fileExtensions` e então a
`languageIds`. Portanto, um nome específico como `index.html` pode sobrescrever
o ícone definido para a extensão `html`.

Para testar, execute a extensão com `F5`, abra a paleta de comandos e selecione
`Preferences: File Icon Theme` > `Zenkai Seti (VS Code)`.

Os arquivos do Seti são mantidos no repositório do VS Code sob licença MIT:
https://github.com/microsoft/vscode/tree/main/extensions/theme-seti
