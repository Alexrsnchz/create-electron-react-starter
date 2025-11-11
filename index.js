#!/usr/bin/env node
import chalk from 'chalk';
import { log, error, steps } from './src/utils/logger.js';
import { executePrompts } from './src/cli/prompts/prompts.js';
import { getUserInfo } from './src/core/detector.js';
import { cloneTemplate } from './src/core/clone.js';
import { installDeps } from './src/core/installation/installer.js';
import { configureDeps } from './src/core/configuration/configurator.js';

/* Executes the CLI */
async function runCLI() {
  log(chalk.cyanBright.bold('🚀  Electron-vite Starter Template'));

  try {
    // Setup prompts
    const answers = await executePrompts();
    // Obtain project information
    const { projectDir, pkgManager } = getUserInfo();

    // Installation process
    await cloneTemplate(projectDir);
    await installDeps(answers.framework, pkgManager, projectDir);
    await configureDeps(answers.framework, projectDir);

    steps(answers.projectName, pkgManager);
  } catch (err) {
    error(err.message || err);
    process.exit(1);
  }
}

runCLI();
