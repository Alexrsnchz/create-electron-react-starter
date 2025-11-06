import { execa } from 'execa';
import { error, failSpinner, startSpinner, successSpinner } from "../utils/logger.js";

export async function installDeps(targetDir, pkgManager) {
    try {
        startSpinner('📦  Installing dependencies...');

        await execa(pkgManager, ['install'], {
            cwd: targetDir,
            stdio: 'pipe',
        });

        successSpinner('Dependencies installed successfully.');
    } catch (err) {
        failSpinner('Error installing dependencies.');
        throw err;
    }
}
