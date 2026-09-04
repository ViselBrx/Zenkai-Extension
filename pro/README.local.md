# Estrutura local do Zenkai Pro

Esta pasta é intencionalmente ignorada pelo Git e pelo empacotamento da
extensão Freemium. Não coloque aqui credenciais; ela deve conter somente o
projeto local/privado do pacote Pro.

- `src/`: código e validação da licença Dodo Payments
- `file-icons/`: file icon theme e SVGs neon
- `product-icons/`: product icon theme e fonte Codicon
- `themes/`: temas de cores exclusivos, se houver

## Testar localmente

1. Execute `npm install` dentro de `pro/` no projeto privado.
2. Gere o product icon theme com `npm run generate:product-icons`.
3. Abra a pasta `pro/` no VS Code e pressione `F5`.
4. Ative a licença pelo comando `Zenkai Pro: Activate License`.

Durante o `F5`, a extensão permite a prévia visual dos assets Pro quando não há
uma chave configurada. Isso vale somente para o `ExtensionMode.Development`.
Uma extensão empacotada ou instalada continua exigindo uma licença Dodo válida.

Depois da ativação, a extensão aplica o file icon theme e o product icon theme
Pro. Sem uma licença válida, ela retorna aos temas Free/padrão.
