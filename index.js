#!/usr/bin/env node
import chalk from 'chalk';
import { log, error, steps } from './src/utils/logger.js';
import { detectPackageManager } from './src/core/detector.js';
import { executePrompts } from './src/cli/prompts/prompts.js';
import { getProjectPath } from './src/utils/paths.js';
import { cloneTemplate } from './src/core/clone.js';
import { installDeps } from './src/core/installation/installer.js';
import { configureDeps } from './src/core/configuration/configurator.js';

/* Executes the CLI */
async function runCLI() {
  log(chalk.cyanBright.bold('🚀  Electron-vite Starter Template'));

  try {
    // Setup prompts
    const { projectName, framework } = await executePrompts();

    // Obtain project information
    const pkgManager = await detectPackageManager();
    const targetDir = getProjectPath(projectName);

    // Installation process
    await cloneTemplate(targetDir);
    await installDeps(framework, pkgManager, targetDir);
    await configureDeps(framework, targetDir);

    steps(projectName, pkgManager);
  } catch (err) {
    error(err.message || err);
    process.exit(1);
  }
}

runCLI();
