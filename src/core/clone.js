import degit from 'degit';
import {error, failSpinner, startSpinner, successSpinner} from "../utils/logger.js";

export async function cloneTemplate(repository, targetDir) {
    try {
        startSpinner('📁  Cloning template from GitHub...');

        const emitter = degit(repository, { cache: false, force: true });
        await emitter.clone(targetDir);

        successSpinner('Template cloned successfully.');
    } catch (err) {
        failSpinner('Error cloning the template.');
        throw err;
    }





}
