import { resolve } from 'path';

/* Checks if the project's name is ".", in which case
returns the current directory, otherwise adds the
name to the path */
export function getProjectPath(projectName) {
  if (projectName === '.') return process.cwd();
  return resolve(process.cwd(), projectName);
}
