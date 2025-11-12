import path from 'path';
import { writeFile } from 'fs/promises';
import { html, index } from './vanillaData.js';

async function createFiles(targetDir) {
  const rendererPath = path.join(targetDir, 'src', 'renderer');

  await writeFile(path.join(rendererPath, 'index.html'), html, 'utf8');
  await writeFile(path.join(rendererPath, 'index.ts'), index, 'utf8');
}

export async function vanillaSetup(targetDir) {
  await createFiles(targetDir);
}
