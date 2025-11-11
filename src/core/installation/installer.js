import { installCmds } from '../../utils/pkgCmds.js';
import { failSpinner, startSpinner, successSpinner } from '../../utils/logger.js';
import { execa } from 'execa';
import { getDependencies } from './depsSetup.js';

export async function installDeps(framework, pkgManager, targetDir) {
  const pm = installCmds[pkgManager];
  const { deps, devDeps } = getDependencies(framework);
  const args = [];

  try {
    startSpinner('📦  Installing dependencies...');

    if (deps.length > 0) {
      await execa(pkgManager, [...pm.base, ...deps], {
        cwd: targetDir,
        stdio: 'inherit',
      });
    }

    if (devDeps.length > 0) {
      await execa(pkgManager, [...pm.base, pm.flag, ...devDeps], {
        cwd: targetDir,
        stdio: 'inherit',
      });
    }

    successSpinner('Dependencies installed successfully.');
  } catch (err) {
    failSpinner('Error installing dependencies.');
    throw err;
  }
}
