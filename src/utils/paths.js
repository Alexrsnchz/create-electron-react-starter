import { resolve } from 'path';

// Obtains the user actual path
// when running the client
export function getProjectPath(projectName) {
    return resolve(process.cwd(), projectName);
}
