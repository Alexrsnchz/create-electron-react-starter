import { input } from '@inquirer/prompts';

export async function askProjectName() {
    return input({
        message: 'Name of the project:',
        default: 'my-electron-app',
    });
}
