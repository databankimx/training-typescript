// Marks each browser lesson script as a module by adding `export {};` when it has no import or export.
// Browser scripts that are plain global scripts share one scope with the browser's own names, so a
// top-level `const name` or `const status` can clash with them. As a module, the script gets its own scope.
//
//   node scripts/add-module-marker.mjs          # list the files that would change
//   node scripts/add-module-marker.mjs --write  # change them

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');
const skipFolders = new Set(['node_modules', '.git', '.runner-work', 'dist']);
const moduleLine = /^\s*(import|export)\s/m;

async function* walk(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipFolders.has(entry.name)) yield* walk(path.join(folder, entry.name));
    } else {
      yield path.join(folder, entry.name);
    }
  }
}

// A browser lesson is a folder with an index.html. Only its scripts need the marker.
async function isBrowserLesson(folder) {
  try {
    return (await stat(path.join(folder, 'index.html'))).isFile();
  } catch {
    return false;
  }
}

const partsFolder = path.join(root, 'part-iii-working-with-html');
let changed = 0;

for await (const file of walk(partsFolder)) {
  const name = path.basename(file);
  if (name !== 'main.ts' && name !== 'solution.ts') continue;
  if (!(await isBrowserLesson(path.dirname(file)))) continue;

  const text = await readFile(file, 'utf8');
  if (moduleLine.test(text)) continue;

  changed += 1;
  console.log(`${write ? 'Changed' : 'Would change'}: ${path.relative(root, file)}`);
  if (write) await writeFile(file, `export {};\n\n${text}`, 'utf8');
}

console.log(`${changed} file(s) ${write ? 'changed' : 'would change'}.${write ? '' : ' Run with --write to apply.'}`);
