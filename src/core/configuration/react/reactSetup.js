import path from 'path';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { app, html, index } from './reactData.js';

async function createConfig(targetDir) {
  const rendererPath = path.join(targetDir, 'src', 'renderer');

  // Generates the framework files
  await writeFile(path.join(rendererPath, 'index.html'), html, 'utf8');
  await writeFile(path.join(rendererPath, 'index.tsx'), index, 'utf8');
  await writeFile(path.join(rendererPath, 'App.tsx'), app, 'utf8');

  // Generates the src subfolder
  await mkdir(path.join(rendererPath, 'src'), { recursive: true });
}

/* Updates */
async function updateViteConfig(targetDir) {
  const configPath = path.join(targetDir, 'electron.vite.config.ts');
  let config = await readFile(configPath, 'utf8');

  // Adds the React import beneath the defineConfig one
  config = config.replace(
    /(import\s*\{\s*defineConfig\s*}\s*from\s*['"]electron-vite['"];?)/,
    `$1\nimport react from '@vitejs/plugin-react-swc';`,
  );

  // Adds the React plugin to the plugins array in renderer
  config = config.replace(/(renderer:\s*\{\s*plugins:\s*\[)/, '$1react(), ');

  await writeFile(configPath, config, 'utf8');
}

export async function reactSetup(targetDir) {
  await createConfig(targetDir);
  await updateViteConfig(targetDir);
}
