import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));

const additionalStems = [
  'audio', 'video', 'document', 'terminal', 'layers', 'clock', 'flask', 'source', 'network', 'monitor',
  'elixir', 'erlang', 'haskell', 'clojure', 'scala', 'groovy', 'fsharp', 'visualbasic', 'assembly', 'zig', 'nim', 'crystal', 'perl', 'racket',
  'folder-features', 'folder-lib', 'folder-constants', 'folder-interfaces', 'folder-graph', 'folder-layouts', 'folder-media',
  'folder-fixtures', 'folder-cli', 'folder-infrastructure', 'folder-jobs', 'folder-cache', 'folder-icons', 'folder-fonts',
  'supabase', 'github', 'folder-supabase', 'folder-github', 'folder-npm'
];

const iconLayout = {
  outerX: 1.35,
  outerSize: 29.3,
  outerRadius: 7.3,
  outerStroke: 1.2,
  frameX: 1.75,
  frameSize: 28.5,
  frameRadius: 7,
  blackX: 2.75,
  blackSize: 26.5,
  blackRadius: 6.3,
  safeX: 4.2,
  safeSize: 23.6,
  safeRadius: 3.8,
  textWidth: 20.5
};

const palette = {
  yellow: '#FFE31A',
  cyan: '#28F5FF',
  blue: '#5DA9FF',
  purple: '#B56CFF',
  green: '#48FF9A',
  greenSoft: '#7AAF5E',
  greenDeep: '#17351C',
  orange: '#FF9B3D',
  pink: '#FF4FB3',
  red: '#FF5C70',
  white: '#E8EBFF'
};

const labels = {
  file: 'FILE', archive: 'ZIP', bat: 'BAT', c: 'C', 'c-cpp': 'C++', cjs: 'CJS', config: 'CFG', cpp: 'C++',
  csharp: 'C#', css: 'CSS', dart: 'DART', database: 'DB', data: 'CSV', docker: 'DOCK', env: 'ENV',
  firebase: 'FIRE', format: 'FMT', git: 'GIT', go: 'GO', gql: 'GQL', graphql: 'GQL', hcl: 'HCL', html: 'HTML',
  image: 'IMG', java: 'JAVA', javascript: 'JS', json: 'JSON', jsonc: 'JSC', kotlin: 'KT', less: 'LESS',
  license: 'LIC', lint: 'LINT', log: 'LOG', lua: 'LUA', markdown: 'MD', make: 'MAKE', mermaid: 'MMD', mjs: 'MJS',
  next: 'NEXT', node: 'NODE', npm: 'NPM', package: 'PKG', pdf: 'PDF', php: 'PHP', powershell: 'PS', prisma: 'ORM',
  proto: 'PROTO', python: 'PY', r: 'R', react: 'REACT', readme: 'README', ruby: 'RB', rust: 'RS', sass: 'SASS',
  scss: 'SCSS', shell: 'SH', solidity: 'SOL', sql: 'SQL', svelte: 'SVELTE', tailwind: 'TW', terraform: 'TF',
  text: 'TXT', typescript: 'TS', tsx: 'TSX', vite: 'VITE', vue: 'VUE', wasm: 'WASM', workspace: 'WORK', xml: 'XML', yaml: 'YAML',
  jsx: 'JSX', astro: 'ASTRO', audio: 'AUDIO', video: 'VIDEO', document: 'DOC', terminal: 'TERM',
  layers: 'LAYR', clock: 'TIME', flask: 'LAB', source: 'SRC', network: 'NET', monitor: 'UI',
  elixir: 'EX', erlang: 'ERL', haskell: 'HS', clojure: 'CLJ', scala: 'SCALA', groovy: 'GROOVY',
  fsharp: 'F#', visualbasic: 'VB', assembly: 'ASM', zig: 'ZIG', nim: 'NIM', crystal: 'CR', perl: 'PL', racket: 'RKT',
  supabase: 'SUPA', github: 'GH'
};

const folderLabels = {
  folder: 'DIR', 'folder-open': 'OPEN', 'folder-src': 'SRC', 'folder-app': 'APP', 'folder-ui': 'UI',
  'folder-components': 'UI', 'folder-models': 'DB', 'folder-services': 'API', 'folder-utils': 'UTIL',
  'folder-hooks': 'HOOK', 'folder-pages': 'PAGE', 'folder-routes': 'ROUTE', 'folder-public': 'PUB',
  'folder-assets': 'ASSET', 'folder-tests': 'TEST', 'folder-node-modules': 'MOD', 'folder-config': 'CFG',
  'folder-docs': 'DOCS', 'folder-scripts': 'CLI', 'folder-server': 'SRV', 'folder-client': 'WEB',
  'folder-prisma': 'ORM', 'folder-database': 'DB', 'folder-migrations': 'MIG', 'folder-packages': 'PKG',
  'folder-examples': 'EX', 'folder-build': 'BLD', 'folder-dist': 'DIST', 'folder-git': 'GIT', 'folder-vscode': 'VSC',
  'folder-controllers': 'CTRL', 'folder-views': 'VIEW', 'folder-styles': 'CSS', 'folder-types': 'TYPE',
  'folder-schemas': 'DB', 'folder-store': 'STATE', 'folder-context': 'CTX', 'folder-middleware': 'MID',
  'folder-workers': 'WORK', 'folder-e2e': 'E2E', 'folder-mocks': 'MOCK', 'folder-vendor': 'VEND',
  'folder-logs': 'LOG', 'folder-storybook': 'STORY', 'folder-locales': 'I18N', 'folder-features': 'FEAT',
  'folder-lib': 'LIB', 'folder-constants': 'CONST', 'folder-interfaces': 'TYPE', 'folder-graph': 'GQL',
  'folder-layouts': 'LAY', 'folder-media': 'MEDIA', 'folder-fixtures': 'FIX', 'folder-cli': 'CLI',
  'folder-infrastructure': 'INFRA', 'folder-jobs': 'JOB', 'folder-cache': 'CACHE', 'folder-icons': 'ICON', 'folder-fonts': 'FONT',
  'folder-supabase': 'SUPA', 'folder-github': 'GH', 'folder-npm': 'NPM'
};

const preferredColors = {
  javascript: 'yellow', cjs: 'yellow', mjs: 'yellow', json: 'yellow', jsonc: 'yellow', env: 'green', yaml: 'yellow',
  typescript: 'blue', tsx: 'blue', css: 'cyan', scss: 'pink', sass: 'pink', less: 'blue', html: 'orange', xml: 'orange',
  python: 'yellow', java: 'orange', go: 'cyan', rust: 'orange', ruby: 'pink', php: 'purple', c: 'blue', cpp: 'cyan',
  'c-cpp': 'cyan', csharp: 'purple', kotlin: 'pink', swift: 'orange', dart: 'cyan', vue: 'green', svelte: 'orange',
  jsx: 'yellow', react: 'cyan', jsonc: 'green', graphql: 'pink', gql: 'pink', sql: 'blue', shell: 'green', powershell: 'cyan', bat: 'green',
  audio: 'purple', video: 'red', document: 'blue', terminal: 'green', layers: 'cyan', clock: 'orange', flask: 'pink',
  source: 'cyan', network: 'blue', monitor: 'purple', elixir: 'purple', erlang: 'red', haskell: 'purple', clojure: 'green',
  scala: 'red', groovy: 'orange', fsharp: 'blue', visualbasic: 'blue', assembly: 'orange', zig: 'yellow', nim: 'green', crystal: 'cyan', perl: 'purple', racket: 'pink',
  docker: 'blue', node: 'green', npm: 'red', package: 'red', git: 'orange', config: 'purple', vite: 'purple', next: 'white',
  astro: 'orange', tailwind: 'cyan', prisma: 'purple', database: 'blue', data: 'cyan', log: 'orange', text: 'white',
  readme: 'purple', license: 'yellow', test: 'green', archive: 'orange', pdf: 'red', image: 'pink', terraform: 'purple',
  wasm: 'purple', hcl: 'purple', mermaid: 'pink', proto: 'blue', firebase: 'orange', make: 'red', format: 'cyan', lint: 'orange',
  folder: 'cyan', 'folder-open': 'purple', 'folder-src': 'cyan', 'folder-app': 'purple', 'folder-ui': 'blue',
  'folder-components': 'cyan', 'folder-models': 'blue', 'folder-services': 'green', 'folder-utils': 'purple',
  'folder-hooks': 'pink', 'folder-pages': 'orange', 'folder-routes': 'green', 'folder-public': 'cyan', 'folder-assets': 'pink',
  'folder-tests': 'green', 'folder-node-modules': 'green', 'folder-config': 'purple', 'folder-docs': 'purple', 'folder-scripts': 'red',
  'folder-server': 'blue', 'folder-client': 'cyan', 'folder-prisma': 'purple', 'folder-database': 'blue', 'folder-migrations': 'orange',
  'folder-packages': 'red', 'folder-examples': 'purple', 'folder-build': 'orange', 'folder-dist': 'orange', 'folder-git': 'orange',
  'folder-vscode': 'cyan', 'folder-controllers': 'orange', 'folder-views': 'purple', 'folder-styles': 'cyan', 'folder-types': 'blue',
  'folder-schemas': 'blue', 'folder-store': 'purple', 'folder-context': 'cyan', 'folder-middleware': 'orange', 'folder-workers': 'green',
  'folder-e2e': 'green', 'folder-mocks': 'pink', 'folder-vendor': 'white', 'folder-logs': 'orange', 'folder-storybook': 'yellow',
  'folder-locales': 'cyan', 'folder-features': 'cyan', 'folder-lib': 'purple', 'folder-constants': 'yellow',
  'folder-interfaces': 'cyan', 'folder-graph': 'pink', 'folder-layouts': 'blue', 'folder-media': 'pink',
  'folder-fixtures': 'orange', 'folder-cli': 'red', 'folder-infrastructure': 'blue', 'folder-jobs': 'orange', 'folder-cache': 'purple',
  'folder-icons': 'pink', 'folder-fonts': 'yellow',
  supabase: 'green', github: 'white',
  'folder-supabase': 'green', 'folder-github': 'white', 'folder-npm': 'red'
};

const cycle = ['cyan', 'purple', 'yellow', 'orange', 'green', 'pink', 'blue'];

// The badge's visual center is y=16. Most marks are authored around y=17
// and receive the base -1 shift below. These small per-mark corrections keep
// asymmetric logos optically centered without moving any text labels.
const verticalCorrections = {
  json: -0.5, vue: -1, docker: -1.5, java: -1, lock: -1,
  graphql: 1, gql: 1, sql: 0.5, image: 0.5, archive: 1.5,
  database: 0.5, log: 0.5, vite: 0.5, astro: 1.25, prisma: 0,
  license: 0.5, workspace: 0.5, make: 0.5, firebase: 0.5,
  lint: 1.5, format: 1,
  folder: -0.5, 'folder-open': -0.5, 'folder-src': -0.5,
  'folder-ui': -0.5, 'folder-components': -0.5,
  'folder-models': 0.5, 'folder-schemas': 0.5, 'folder-prisma': 0.5, 'folder-database': 0.5,
  'folder-assets': 0.5, 'folder-logs': 0.5, 'folder-controllers': -1,
  document: 1, terminal: 0.5, layers: 0.5, flask: -0.5,
  'folder-features': 0.5, 'folder-graph': 1, 'folder-layouts': 0.5,
  'folder-media': 0.5, 'folder-fixtures': -0.5, 'folder-cli': 0.5, 'folder-cache': 1.5
};

function colorFor(stem) {
  if (preferredColors[stem]) return palette[preferredColors[stem]];
  let hash = 0;
  for (const character of stem) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return palette[cycle[hash % cycle.length]];
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function textMark(label, accent, size = null, y = 17, style = 'brand') {
  const natural = style === 'plain' || style === 'natural';

  // To ensure text is legible at 16x16 in the VS Code file explorer:
  // 1. We use a standard UI font stack instead of 'Arial Black'. Arial Black is too thick
  //    and the letters turn into unreadable blobs when scaled down.
  // 2. We use font-weight 800 (Extra Bold) which provides strong presence but keeps
  //    the counters (the holes in letters) open and visible.
  
  const defaultSize = label.length <= 2 ? 15 : label.length === 3 ? 12 : label.length === 4 ? 10.5 : 9;
  const minimumSize = natural ? 0 : label.length === 4 ? 10.5 : label.length >= 5 ? 9 : 0;
  const fontSize = Math.max(size ?? defaultSize, minimumSize);

  let fit = '';
  let spacing = '';
  if (!natural) {
    if (label.length <= 2) {
      spacing = ' letter-spacing="-0.5"';
    } else if (label.length === 3) {
      fit = ` textLength="18.5" lengthAdjust="spacingAndGlyphs"`;
    } else if (label.length === 4) {
      fit = ` textLength="18" lengthAdjust="spacingAndGlyphs"`;
    } else {
      fit = ` textLength="17" lengthAdjust="spacingAndGlyphs"`;
    }
  }

  const fontFamily = style === 'plain' ? 'Arial,sans-serif' : "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const fontWeight = style === 'plain' ? '700' : '800';
  
  // dy="0.35em" perfectly centers the text visually across all renderers.
  return `<text x="16" y="${y}" dy="0.35em" text-anchor="middle" fill="${accent}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}"${spacing}${fit}>${escapeXml(label)}</text>`;
}

function reactMark(accent) {
  return `<g fill="none" stroke-linecap="round"><ellipse cx="16" cy="17" rx="8.6" ry="3.25" stroke="${accent}" stroke-width="2"/><ellipse cx="16" cy="17" rx="8.6" ry="3.25" stroke="${accent}" stroke-width="2" transform="rotate(60 16 17)"/><ellipse cx="16" cy="17" rx="8.6" ry="3.25" stroke="${accent}" stroke-width="2" transform="rotate(120 16 17)"/><circle cx="16" cy="17" r="2.2" fill="${palette.pink}" stroke="none"/></g>`;
}

function jsonMark(accent) {
  return `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 9.5h-1.1a3.4 3.4 0 0 0-3.4 3.4v1.6c0 1.5-.7 2.6-2.1 3.5 1.4.9 2.1 2 2.1 3.5v1.6a3.4 3.4 0 0 0 3.4 3.4h1.1M19.5 9.5h1.1a3.4 3.4 0 0 1 3.4 3.4v1.6c0 1.5.7 2.6 2.1 3.5-1.4.9-2.1 2-2.1 3.5v1.6a3.4 3.4 0 0 1-3.4 3.4h-1.1" stroke="${accent}" stroke-width="2.4"/><path d="M15 13.5h2M15 17h2M15 20.5h2" stroke="${palette.cyan}" stroke-width="2"/></g>`;
}

function jsoncMark(accent) {
  const green = palette.greenSoft;
  return `<g stroke-linejoin="round"><path d="M10.2 9h2.4L8.7 25H6.2zM14 9h2.4l-3.7 16h-2.4z" fill="${green}"/><ellipse cx="20.8" cy="17" rx="6.6" ry="8" fill="${green}"/><path d="M20.8 9c3.7 0 6.6 3.6 6.6 8s-2.9 8-6.6 8c2.1-1.2 3.6-4.3 3.6-8s-1.5-6.8-3.6-8z" fill="${palette.greenDeep}" opacity=".86"/><ellipse cx="20.8" cy="17" rx="2.9" ry="4.1" fill="#0B0B0C"/><path d="M18.8 13.3c-.7 1-1.1 2.3-1.1 3.7 0 1.5.4 2.8 1.1 3.8" fill="none" stroke="${green}" stroke-width=".9" opacity=".8"/></g>`;
}

function prismaMark(accent) {
  return `<g stroke="${accent}" stroke-width="1.15" stroke-linejoin="round"><path d="M16 8 8.2 23.2 16 20z" fill="${palette.blue}"/><path d="M16 8 16 20l7.8 3.2z" fill="${accent}"/><path d="M8.2 23.2 16 20l7.8 3.2L16 26z" fill="#6D3FAD"/><path d="M16 8v12" fill="none" stroke="${palette.white}" stroke-width=".8" opacity=".7"/></g>`;
}

function artFor(stem, accent) {
  const pink = palette.pink;
  const yellow = palette.yellow;
  const white = palette.white;

  switch (stem) {
    case 'supabase':
      return `<circle cx="16" cy="16" r="9" fill="${accent}" fill-opacity="0.15"/><path d="M16 7L10 16h6v9l6-9h-6V7z" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round"/>`;
    case 'github':
      return `<path d="M16 4.5C9.6 4.5 4.5 9.6 4.5 16c0 5 3.3 9.3 7.8 10.8.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.7 2.7 1.2 3.3 1 .1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.2-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.7.1 3 .8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.8-5.8 7.8-10.8 0-6.4-5.2-11.5-11.5-11.5Z" fill="${accent}"/>`;
    case 'javascript': return textMark('JS', accent);
    case 'typescript': return textMark('TS', accent);
    case 'jsx':
    case 'tsx':
    case 'react': return reactMark(accent);
    case 'clojure': return textMark('CLJ', accent);
    case 'assembly': return textMark('ASM', accent);
    case 'crystal': return textMark('CR', accent);
    case 'elixir': return textMark('EX', accent);
    case 'groovy': return textMark('GRV', accent);
    case 'erlang': return textMark('ERL', accent);
    case 'racket': return textMark('RKT', accent);
    case 'html': return `<path d="m11 11-4 6 4 6M21 11l4 6-4 6M18 9l-4 14" fill="none" stroke="${accent}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'css': return textMark('CSS', accent);
    case 'scss': return textMark('SCSS', accent);
    case 'sass': return textMark('SASS', accent);
    case 'less': return textMark('LESS', accent);
    case 'json': return jsonMark(accent);
    case 'jsonc': return jsoncMark(accent);
    case 'markdown': return textMark('MD', accent);
    case 'shell': return textMark('$_', accent);
    case 'powershell': return textMark('PS', accent);
    case 'cjs': return textMark('CJS', accent);
    case 'mjs': return textMark('MJS', accent);
    case 'python':
      return `<g stroke-linejoin="round"><path d="M16.8 8.5h-3.9A4.9 4.9 0 0 0 8 13.4v4.1h8.9v-3.1h-4.3a1.8 1.8 0 0 1 0-3.6h4.2a3.2 3.2 0 0 1 3.2 3.2v2.3h3.8v-3.1a4.7 4.7 0 0 0-4.7-4.7z" fill="${accent}"/><path d="M15.2 25.5h3.9a4.9 4.9 0 0 0 4.9-4.9v-4.1h-8.9v3.1h4.3a1.8 1.8 0 0 1 0 3.6h-4.2a3.2 3.2 0 0 1-3.2-3.2v-2.3H8.2v3.1a4.7 4.7 0 0 0 4.7 4.7z" fill="${palette.blue}"/><circle cx="13.9" cy="12.6" r="1" fill="#0B0B0C"/><circle cx="18.1" cy="21.4" r="1" fill="#0B0B0C"/></g>`;
    case 'vue':
      return `<path d="m7.2 11 8.8 14 8.8-14h-4.8L16 19l-4-8z" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linejoin="round"/>`;
    case 'svelte': return textMark('S', accent);
    case 'node':
      return `<path d="m16 8.5 7.4 4.2v8.6L16 25.5l-7.4-4.2v-8.6z" fill="none" stroke="${accent}" stroke-width="2.1" stroke-linejoin="round"/>${textMark('N', accent, 11, 17)}`;
    case 'npm': return textMark('npm', accent, 11);
    case 'git':
      return `<g fill="none" stroke="${accent}" stroke-width="1.9" stroke-linecap="round"><path d="M11 23V13l10-4M11 16l10 7"/><circle cx="11" cy="23" r="2.1" fill="${accent}" stroke="none"/><circle cx="11" cy="13" r="2.1" fill="${accent}" stroke="none"/><circle cx="21" cy="9" r="2.1" fill="${accent}" stroke="none"/><circle cx="21" cy="23" r="2.1" fill="${accent}" stroke="none"/></g>`;
    case 'docker':
      return `<g fill="none" stroke="${accent}" stroke-width="1.9" stroke-linejoin="round"><path d="M8 16h14v7H8zM10 12h3v4h-3zM14.5 12h3v4h-3zM19 12h3v4h-3z"/><path d="M8 23c2.8 2 10.8 2.6 15 .2 1.4-.8 2.1-1.8 2.2-3.2" stroke-linecap="round"/><path d="M8 25h16" stroke="${palette.blue}" stroke-linecap="round"/></g>`;
    case 'java': return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 10c4 2 0 3 2 5 2 1.3 3-1 2-2.2"/><path d="M11 17h10v4.5a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1-2.5-2.5z"/><path d="M21 18h2a2 2 0 0 1 0 4h-2M12 26h9"/></g>`;
    case 'ruby': return `<path d="m9 13 4-3h6l4 3-7 11z" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round"/><path d="m9 13 7 2 7-2M16 15v9" fill="none" stroke="${palette.pink}" stroke-width="1.2"/>`;
    case 'rust': return `<g fill="none" stroke="${accent}" stroke-linecap="round"><circle cx="16" cy="17" r="6.8" stroke-width="2.2"/><circle cx="16" cy="17" r="2.1" fill="${accent}" stroke="none"/><path d="M16 8v3M16 23v3M7 17h3M22 17h3M9.6 10.6l2.1 2.1M20.3 21.3l2.1 2.1M22.4 10.6l-2.1 2.1M11.7 21.3l-2.1 2.1" stroke-width="1.8"/></g>`;
    case 'go': return textMark('GO', accent);
    case 'php': return textMark('PHP', accent);
    case 'c': return textMark('C', accent);
    case 'cpp':
    case 'c-cpp': return textMark('C++', accent);
    case 'csharp': return textMark('C#', accent);
    case 'kotlin': return textMark('KT', accent);
    case 'swift': return textMark('SWIFT', accent);
    case 'dart': return textMark('DART', accent);
    case 'yaml': return textMark('YAML', accent);
    case 'graphql':
    case 'gql': return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round"><path d="M10 12h12M10 22h12M10 12l6 10M22 12l-6 10"/><circle cx="10" cy="12" r="2.2" fill="${accent}" stroke="none"/><circle cx="22" cy="12" r="2.2" fill="${accent}" stroke="none"/><circle cx="10" cy="22" r="2.2" fill="${accent}" stroke="none"/><circle cx="22" cy="22" r="2.2" fill="${accent}" stroke="none"/></g>`;
    case 'sql': return `<g fill="none" stroke="${accent}" stroke-width="2"><ellipse cx="16" cy="11" rx="7" ry="3"/><path d="M9 11v11c0 1.7 3.1 3 7 3s7-1.3 7-3V11M9 16c0 1.7 3.1 3 7 3s7-1.3 7-3"/></g>`;
    case 'config': return `<g fill="none" stroke="${accent}" stroke-linecap="round"><circle cx="16" cy="17" r="5.5" stroke-width="2.2"/><circle cx="16" cy="17" r="1.8" fill="${accent}" stroke="none"/><path d="M16 8v3M16 23v3M7 17h3M22 17h3M9.5 10.5l2.2 2.2M20.3 21.3l2.2 2.2M22.5 10.5l-2.2 2.2M11.7 21.3l-2.2 2.2" stroke-width="1.8"/></g>`;
    case 'image': return `<circle cx="22" cy="11" r="2.2" fill="${yellow}"/><path d="m7 24 6.5-8 4.2 4 3-3.5 4.3 7.5z" fill="${accent}" fill-opacity=".22" stroke="${accent}" stroke-width="2" stroke-linejoin="round"/>`;
    case 'archive': return `<g fill="none" stroke="${accent}" stroke-width="2" stroke-linejoin="round"><path d="M7 11h18v13H7zM7 11l2-4h14l2 4M12 16h8M14 20h4"/></g>`;
    case 'pdf': return textMark('PDF', accent);
    case 'env': return textMark('ENV', accent);
    case 'readme': return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round"><path d="M8 10h5.5a2.5 2.5 0 0 1 2.5 2.5V24c-.7-1.3-1.8-2-3.5-2H8zM24 10h-5.5a2.5 2.5 0 0 0-2.5 2.5V24c.7-1.3 1.8-2 3.5-2H24z"/><path d="M10 14h3M19 14h3"/></g>`;
    case 'lock': return `<g fill="none" stroke="${accent}" stroke-width="1.9" stroke-linejoin="round"><rect x="9" y="15" width="14" height="10" rx="2"/><path d="M12 15v-3a4 4 0 0 1 8 0v3"/><circle cx="16" cy="20" r="1" fill="${accent}" stroke="none"/></g>`;
    case 'test': return `<g fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="9" width="16" height="15" rx="2" stroke-width="1.8"/><path d="m11 16 2.5 2.5 4.5-5" stroke-width="2.2"/><path d="M19 16h2.5M11 21h10.5" stroke-width="1.6"/></g>`;
    case 'database': return `<g fill="none" stroke="${accent}" stroke-width="1.8"><ellipse cx="16" cy="11" rx="7" ry="3"/><path d="M9 11v11c0 1.7 3.1 3 7 3s7-1.3 7-3V11"/><path d="M9 16c0 1.7 3.1 3 7 3s7-1.3 7-3"/></g>`;
    case 'data': return `<g fill="none" stroke="${accent}" stroke-width="1.7"><rect x="8" y="10" width="16" height="14" rx="1"/><path d="M8 15h16M8 20h16M14 10v14M19 10v14"/></g>`;
    case 'log': return `<path d="M8 23V18M13 23V14M18 23V19M23 23V10" fill="none" stroke="${accent}" stroke-width="2.2" stroke-linecap="round"/>`;
    case 'text': return `<path d="M9 12h14M9 17h14M9 22h9" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
    case 'vite': return `<path d="m18 8-8 10h6l-2 7 8-11h-6z" fill="${accent}"/>`;
    case 'next': return `<circle cx="16" cy="17" r="8" fill="none" stroke="${accent}" stroke-width="1.7"/>${textMark('N', accent, 12, 17)}`;
    case 'astro': return `<path d="m16 8 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" fill="none" stroke="${accent}" stroke-width="1.6" stroke-linejoin="round"/>`;
    case 'tailwind': return `<g fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"><path d="M8 17c2.4-5 5-6.8 7.8-4.8 1.8 1.3 2.8 3.4 4.7 2.8 1.2-.4 2.1-1.4 2.8-2.8"/><path d="M8 22c2.4-5 5-6.8 7.8-4.8 1.8 1.3 2.8 3.4 4.7 2.8 1.2-.4 2.1-1.4 2.8-2.8"/></g>`;
    case 'workspace': return `<g fill="none" stroke="${accent}" stroke-width="1.8"><rect x="8" y="9" width="8" height="7" rx="1"/><rect x="17" y="9" width="7" height="7" rx="1"/><rect x="8" y="17" width="8" height="7" rx="1"/><rect x="17" y="17" width="7" height="7" rx="1"/></g>`;

    // ─── Media / Misc ─────────────────────────────────────────────────────────
    case 'audio': return `<g fill="none" stroke="${accent}" stroke-linecap="round"><path d="M8 21v-4M12 24V13M16 22V10M20 24V14M24 20v-5" stroke-width="2.2"/></g>`;
    case 'video': return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round"><rect x="7.5" y="10" width="14" height="14" rx="2"/><path d="m21.5 14 4-2v10l-4-2z"/><path d="m14 14 4 3-4 3z" fill="${accent}" stroke="none"/></g>`;
    case 'layers': return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round"><path d="m16 8 9 4.5-9 4.5-9-4.5zM7 17l9 4.5 9-4.5M7 21l9 4 9-4"/></g>`;
    case 'clock': return `<g fill="none" stroke="${accent}" stroke-linecap="round"><circle cx="16" cy="17" r="8" stroke-width="2"/><path d="M16 12v5l3.5 2" stroke-width="2"/></g>`;
    case 'flask': return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round"><path d="M13 9h6M14 9v6l-5 8a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 23 23l-5-8V9"/><path d="M11 21h10" stroke-linecap="round"/></g>`;
    case 'source': return `<path d="m12 11-5 6 5 6M20 11l5 6-5 6M17 9l-2 16" fill="none" stroke="${accent}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'network': return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round"><path d="M10 12h12M10 12l6 10M22 12l-6 10"/><circle cx="10" cy="12" r="2.2" fill="${accent}" stroke="none"/><circle cx="22" cy="12" r="2.2" fill="${accent}" stroke="none"/><circle cx="16" cy="22" r="2.2" fill="${accent}" stroke="none"/></g>`;
    case 'monitor': return `<g fill="none" stroke="${accent}" stroke-linejoin="round"><rect x="7.5" y="9" width="17" height="12" rx="1.5" stroke-width="1.8"/><path d="M13 25h6M16 21v4" stroke-width="1.8" stroke-linecap="round"/></g>`;
    case 'lint': return `<path d="m9 17 4 4 10-10" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'format': return `<path d="M9 11h14M9 16h10M9 21h14" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;

    default: return textMark(labels[stem] ?? stem.toUpperCase(), accent);
  }
}

function folderArt(stem, accent) {
  if (['folder', 'folder-open'].includes(stem)) {
    return `<path d="M7 13h5l2-2h11v10.5A2.5 2.5 0 0 1 22.5 24h-15z" fill="none" stroke="${accent}" stroke-width="2" stroke-linejoin="round"/>`;
  }
  if (stem === 'folder-src') {
    return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 12-5 5 5 5M20 12l5 5-5 5M14 23l4-12"/></g>`;
  }
  if (stem === 'folder-app') return `<g fill="none" stroke="${accent}" stroke-width="1.8"><rect x="8" y="10" width="7" height="6" rx="1"/><rect x="17" y="10" width="7" height="6" rx="1"/><rect x="8" y="18" width="7" height="6" rx="1"/><rect x="17" y="18" width="7" height="6" rx="1"/></g>`;
  if (['folder-ui', 'folder-components'].includes(stem)) return `<g fill="${accent}"><rect x="8" y="10" width="6" height="6" rx="1"/><rect x="18" y="10" width="6" height="6" rx="1"/><rect x="8" y="19" width="6" height="6" rx="1"/><rect x="18" y="19" width="6" height="6" rx="1"/></g>`;
  if (stem === 'folder-types') return `<path d="m12 12-5 5 5 5M20 12l5 5-5 5" fill="none" stroke="${accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (stem === 'folder-features') return artFor('layers', accent);
  if (['folder-lib', 'folder-core', 'folder-common', 'folder-shared'].includes(stem)) return artFor('package', accent);
  if (stem === 'folder-constants') return artFor('config', accent);
  if (stem === 'folder-interfaces') return artFor('source', accent);
  if (stem === 'folder-graph') return artFor('graphql', accent);
  if (['folder-layouts', 'folder-templates', 'folder-partials'].includes(stem)) return artFor('workspace', accent);
  if (['folder-media', 'folder-images', 'folder-static', 'folder-uploads'].includes(stem)) return artFor('image', accent);
  if (['folder-fixtures', 'folder-seeds'].includes(stem)) return artFor('flask', accent);
  if (['folder-cli', 'folder-bin', 'folder-commands', 'folder-tools'].includes(stem)) return artFor('terminal', accent);
  if (['folder-infrastructure', 'folder-adapters'].includes(stem)) return artFor('network', accent);
  if (['folder-jobs', 'folder-queues', 'folder-cron'].includes(stem)) return artFor('clock', accent);
  if (['folder-cache', 'folder-temp', 'folder-tmp', 'folder-releases'].includes(stem)) return artFor('archive', accent);
  if (['folder-translations', 'folder-i18n'].includes(stem)) return `<circle cx="16" cy="17" r="8" fill="none" stroke="${accent}" stroke-width="1.8"/><path d="M8 17h16M16 9c3 3 3 13 0 16M16 9c-3 3-3 13 0 16" fill="none" stroke="${accent}" stroke-width="1.4"/>`;
  if (stem === 'folder-icons') return artFor('monitor', accent);
  if (stem === 'folder-fonts') return textMark('A', accent, 18);
  if (['folder-models', 'folder-schemas', 'folder-prisma', 'folder-database'].includes(stem)) {
    return `<g fill="none" stroke="${accent}" stroke-width="1.8"><ellipse cx="16" cy="11" rx="7" ry="3"/><path d="M9 11v11c0 1.7 3.1 3 7 3s7-1.3 7-3V11M9 16c0 1.7 3.1 3 7 3s7-1.3 7-3"/></g>`;
  }
  if (['folder-services', 'folder-routes', 'folder-server', 'folder-client', 'folder-middleware'].includes(stem)) {
    return `<g fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h8v10h8M16 17h8"/><circle cx="8" cy="12" r="2" fill="${accent}"/><circle cx="24" cy="17" r="2" fill="${accent}"/><circle cx="24" cy="22" r="2" fill="${accent}"/></g>`;
  }
  if (['folder-utils', 'folder-config', 'folder-workers'].includes(stem)) return artFor('config', accent);
  if (['folder-pages', 'folder-views', 'folder-docs', 'folder-storybook'].includes(stem)) return artFor('readme', accent);
  if (['folder-public', 'folder-locales'].includes(stem)) return `<circle cx="16" cy="17" r="8" fill="none" stroke="${accent}" stroke-width="1.8"/><path d="M8 17h16M16 9c3 3 3 13 0 16M16 9c-3 3-3 13 0 16" fill="none" stroke="${accent}" stroke-width="1.4"/>`;
  if (stem === 'folder-assets') return artFor('image', accent);
  if (['folder-tests', 'folder-e2e'].includes(stem)) return artFor('test', accent);
  if (['folder-node-modules', 'folder-packages', 'folder-vendor'].includes(stem)) return artFor('package', accent);
  if (stem === 'folder-scripts') return artFor('shell', accent);
  if (stem === 'folder-styles') return `<g fill="none" stroke="${accent}" stroke-width="1.8"><circle cx="12" cy="13" r="3"/><circle cx="20" cy="13" r="3"/><circle cx="16" cy="21" r="3"/><path d="m14.5 15.2-1.2 2.2M17.5 15.2l1.2 2.2M15 13h2"/></g>`;
  if (stem === 'folder-store' || stem === 'folder-context') return `<path d="m16 8 8 4.5v9L16 26l-8-4.5v-9z" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linejoin="round"/>`;
  if (stem === 'folder-migrations') return `<path d="M9 12h14M20 9l3 3-3 3M23 22H9M12 19l-3 3 3 3" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (stem === 'folder-examples') return textMark('</>', accent, 12.5);
  if (stem === 'folder-build' || stem === 'folder-dist') return artFor('package', accent);
  if (stem === 'folder-git') return artFor('git', accent);
  if (stem === 'folder-github') return artFor('github', accent);
  if (stem === 'folder-supabase') return artFor('supabase', accent);
  if (stem === 'folder-npm') return artFor('npm', accent);
  if (stem === 'folder-vscode') return textMark('</>', accent, 12.5);
  if (stem === 'folder-controllers') return `<path d="M9 11h14M9 17h14M9 23h14" stroke="${accent}" stroke-width="2" stroke-linecap="round"/><circle cx="14" cy="11" r="2" fill="${accent}"/><circle cx="20" cy="17" r="2" fill="${accent}"/><circle cx="12" cy="23" r="2" fill="${accent}"/>`;
  if (stem === 'folder-mocks') return textMark('?', accent, 18);
  if (stem === 'folder-logs') return artFor('log', accent);
  return textMark(folderLabels[stem] ?? 'DIR', accent);
}

function makeSvg(stem, accent) {
  const isFolder = stem === 'folder' || stem === 'folder-open' || stem.startsWith('folder-');
  const content = isFolder ? folderArt(stem, accent) : artFor(stem, accent);
  const correction = verticalCorrections[stem] ?? 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs><filter id="glow" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation=".5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><clipPath id="content-safe"><rect x="${iconLayout.safeX}" y="${iconLayout.safeX}" width="${iconLayout.safeSize}" height="${iconLayout.safeSize}" rx="${iconLayout.safeRadius}"/></clipPath></defs>
  <rect x="${iconLayout.outerX}" y="${iconLayout.outerX}" width="${iconLayout.outerSize}" height="${iconLayout.outerSize}" rx="${iconLayout.outerRadius}" fill="none" stroke="${accent}" stroke-width="${iconLayout.outerStroke}" opacity=".45" filter="url(#glow)"/>
  <rect x="${iconLayout.frameX}" y="${iconLayout.frameX}" width="${iconLayout.frameSize}" height="${iconLayout.frameSize}" rx="${iconLayout.frameRadius}" fill="${accent}" stroke="${accent}" stroke-width=".45"/>
  <rect x="${iconLayout.blackX}" y="${iconLayout.blackX}" width="${iconLayout.blackSize}" height="${iconLayout.blackSize}" rx="${iconLayout.blackRadius}" fill="#0B0B0C"/>
  <g clip-path="url(#content-safe)"><g transform="translate(0 ${-1 + correction})">${content}</g></g>
</svg>
`;
}

const svgFiles = [...new Set([
  ...fs.readdirSync(directory).filter((name) => name.endsWith('.svg')),
  ...additionalStems.map((stem) => `${stem}.svg`)
])];
for (const filename of svgFiles) {
  const stem = filename.slice(0, -4);
  fs.writeFileSync(path.join(directory, filename), makeSvg(stem, colorFor(stem)), 'utf8');
}

console.log(`Gerados ${svgFiles.length} file icons no estilo neon badge.`);
