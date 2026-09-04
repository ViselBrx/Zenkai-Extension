import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const mapping = JSON.parse(fs.readFileSync(path.join(directory, 'codicon-mapping.json'), 'utf8'));
const reference = fs.readFileSync(path.join(directory, 'product-icon-reference.md'), 'utf8');

const codepoints = new Map();
for (const [decimal, names] of Object.entries(mapping)) {
  for (const name of names) {
    codepoints.set(name, Number(decimal).toString(16).toUpperCase());
  }
}

const entries = new Map();
for (const line of reference.split(/\r?\n/)) {
  const cells = line.split('|').map((cell) => cell.trim());
  const identifier = cells[2];
  const codicon = cells[3];

  if (!identifier || !codicon || !/^[a-z0-9][a-z0-9-]*$/.test(identifier) || !/^[a-z0-9][a-z0-9-]*$/.test(codicon)) {
    continue;
  }

  const codepoint = codepoints.get(codicon);
  if (!codepoint) {
    throw new Error(`Codicon sem codepoint: ${codicon}`);
  }

  entries.set(identifier, { codicon, codepoint });
}

const overrides = {
  'accounts-view-bar-icon': 'shield',
  'breakpoints-view-icon': 'bug',
  'callstack-view-icon': 'circuit-board',
  'comments-view-icon': 'pulse',
  'default-view-icon': 'dashboard',
  'explorer-view-icon': 'code',
  'extensions-view-icon': 'rocket',
  'markers-view-icon': 'pulse',
  'open-editors-view-icon': 'files',
  'outline-view-icon': 'symbol-interface',
  'output-view-icon': 'server',
  'ports-view-icon': 'server',
  'remote-explorer-view-icon': 'circuit-board',
  'run-view-icon': 'zap',
  'search-view-icon': 'telescope',
  'settings-view-bar-icon': 'tools',
  'source-control-view-icon': 'git-compare',
  'test-view-icon': 'beaker',
  'timeline-view-icon': 'pulse',
  'watch-view-icon': 'bug'
};

for (const [identifier, codicon] of Object.entries(overrides)) {
  const codepoint = codepoints.get(codicon);
  if (!entries.has(identifier)) {
    throw new Error(`Identificador de product icon ausente: ${identifier}`);
  }
  if (!codepoint) {
    throw new Error(`Codicon de override sem codepoint: ${codicon}`);
  }
  entries.get(identifier).codicon = codicon;
  entries.get(identifier).codepoint = codepoint;
}

const iconDefinitions = {};
for (const [identifier, { codepoint }] of entries) {
  iconDefinitions[identifier] = {
    fontCharacter: `\\${codepoint}`,
    fontId: 'codicon'
  };
}

const theme = {
  name: 'Zenkai Pro Developer Product Icons',
  fonts: [
    {
      id: 'codicon',
      src: [
        {
          path: './codicon.ttf',
          format: 'truetype'
        }
      ],
      weight: 'normal',
      style: 'normal'
    }
  ],
  iconDefinitions
};

fs.writeFileSync(
  path.join(directory, 'zenkai-pro-product-icon-theme.json'),
  `${JSON.stringify(theme, null, 2)}\n`,
  'utf8'
);

console.log(`Gerado com ${entries.size} product icons e ${Object.keys(overrides).length} overrides Zenkai.`);
