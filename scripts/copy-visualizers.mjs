// Copies the algorithm visualizers from the JavaScript course into the matching steps of this course.
// A visualizer is a folder called visualizer (or a visualizer.html file) beside a lesson. Its pages load their own
// scripts and styles by relative path, so the whole folder is copied.
//
// Only steps that already exist here are filled, so run this after the lesson files are in place.
//
//   node scripts/copy-visualizers.mjs                        # list what would be copied
//   node scripts/copy-visualizers.mjs --write                # copy it
//   node scripts/copy-visualizers.mjs --from ../other-course # a different JavaScript course folder

import { access, cp, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');
const fromIndex = process.argv.indexOf('--from');
const source = path.resolve(fromIndex === -1 ? path.join(root, '..', 'training-javascript') : process.argv[fromIndex + 1]);

// JavaScript chapter folder -> TypeScript chapter folder, within the same part.
const chapters = new Map([
  ['part-iv-advanced/ch21-complexity', 'part-iv-advanced/ch28-complexity'],
]);

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

let copied = 0;
for (const [fromChapter, toChapter] of chapters) {
  const fromPath = path.join(source, fromChapter);
  const toPath = path.join(root, toChapter);
  for (const step of await readdir(fromPath, { withFileTypes: true })) {
    if (!step.isDirectory()) continue;
    const fromStep = path.join(fromPath, step.name);
    const toStep = path.join(toPath, step.name);
    // Only fill a step this course has. A step with no lesson.json has not been written yet.
    if (!(await exists(path.join(toStep, 'lesson.json')))) continue;

    const items = [];
    if (await exists(path.join(fromStep, 'visualizer'))) items.push('visualizer');
    if (await exists(path.join(fromStep, 'visualizer.html'))) items.push('visualizer.html');

    for (const item of items) {
      const from = path.join(fromStep, item);
      const to = path.join(toStep, item);
      const isFolder = (await stat(from)).isDirectory();
      console.log(`${write ? 'Copying' : 'Would copy'}: ${path.relative(source, from)} -> ${path.relative(root, to)}${isFolder ? ' (folder)' : ''}`);
      copied += 1;
      if (write) await cp(from, to, { recursive: true });
    }
  }
}
console.log(`${copied} item(s) ${write ? 'copied' : 'would be copied'}.${write ? '' : ' Run with --write to copy them.'}`);
