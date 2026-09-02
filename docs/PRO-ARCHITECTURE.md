# Arquitetura Freemium e Pro

A raiz deste repositório é a extensão **Zenkai Theme** Freemium. Ela contém os
temas de cores e a base pública de file icons.

O material Pro não deve ser colocado neste repositório público. Durante o
desenvolvimento local, use esta estrutura:

```text
pro/
├── src/             # código da extensão Pro e licença
├── file-icons/      # JSON e SVGs dos file icons Pro
├── product-icons/   # JSON e fonte Codicon dos product icons Pro
└── themes/          # temas de cores Pro, se houver
```

Essa pasta está listada no `.gitignore` e no `.vscodeignore`. Portanto, ela não
vai para o GitHub nem para o `.vsix` Freemium por acidente. Para uma publicação
real, o ideal é manter o pacote Pro em um repositório privado e gerar o `.vsix`
Pro a partir dele.

## O que pertence a cada pacote

### Freemium

- temas de cores públicos;
- tema Seti ou file icons básicos;
- referência para a versão Pro, quando necessário;
- nenhum SVG, WOFF ou JSON exclusivo do Pro.

### Pro

- file icons neon em `file-icons/`;
- product icon theme em `product-icons/`;
- temas de cores e recursos premium;
- validação da licença Dodo Payments.

O manifesto Pro deve usar `iconThemes` para file icons e
`productIconThemes` para product icons. Se o Pro precisar da API do pacote
Freemium, declare `zenkai.zenkai-vscode-extension` em
`extensionDependencies`.

## Segurança da licença

Nunca coloque `DODO_PAYMENTS_API_KEY`, webhook secrets ou qualquer credencial
privada no código da extensão. A extensão cliente pode usar os endpoints
públicos de ativação e validação de license keys do Dodo, que não exigem a API
key secreta. Chaves administrativas e webhooks devem ficar em um backend ou
na infraestrutura de CI.

Uma extensão instalada sempre pode ser inspecionada. A licença protege o uso
comercial e controla a ativação, mas não torna SVGs, fontes ou JavaScript
impossíveis de copiar. Por isso, os assets Pro devem ficar fora do repositório
público e o acesso deve ser validado no pacote Pro.
