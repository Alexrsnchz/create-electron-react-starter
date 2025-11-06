#!/usr/bin/env node
import chalk from "chalk";
import { askProjectName } from './src/cli/prompts.js';
import { getProjectPath } from './src/utils/paths.js';
import { cloneTemplate } from './src/core/clone.js';
import { detectPackageManager } from './src/core/detector.js';
import { installDeps } from './src/core/install.js';
import { log, error, steps } from './src/utils/logger.js';

async function runClient() {
    const repository = 'Alexrsnchz/electron-react-starter';
    log(chalk.cyanBright.bold('🚀  Electron-vite React Template'));

    try {
        const projectName = await askProjectName();
        const targetDir = getProjectPath(projectName);

        await cloneTemplate(repository, targetDir);
        const pkgManager = await detectPackageManager();
        await installDeps(targetDir, pkgManager);

        steps(projectName, pkgManager);
    } catch (err) {
        error(err.message || err);
        process.exit(1);
    }
}

runClient();
