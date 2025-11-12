import { installCmds } from '../../utils/pkgCmds.js';
import { failSpinner, startSpinner, successSpinner } from '../../utils/logger.js';
import { execa } from 'execa';
import { getDependencies } from './depsSetup.js';

export async function installDeps(framework, packaging, pkgManager, targetDir) {
  const pm = installCmds[pkgManager];
  const { deps, devDeps } = getDependencies(framework, packaging);

  try {
    startSpinner('📦  Installing dependencies...');

    if (deps.length > 0) {
      await execa(pkgManager, [...pm.manager, ...deps], {
        cwd: targetDir,
        stdio: 'pipe',
      });
    }

    if (devDeps.length > 0) {
      await execa(pkgManager, [...pm.manager, pm.flag, ...devDeps], {
        cwd: targetDir,
        stdio: 'pipe',
      });
    }

    successSpinner('Dependencies installed successfully.');
  } catch (err) {
    failSpinner('Error installing dependencies.');
    throw err;
  }
}
