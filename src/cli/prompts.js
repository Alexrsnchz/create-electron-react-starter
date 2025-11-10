import { input, select } from '@inquirer/prompts';
import { existsSync } from 'fs';

/**
 * Asks the name of the project
 * @returns {Promise<Promise<string> & {cancel: () => void}>}
 */
async function askProjectName() {
  return input({
    message: 'Name of the project:',
    default: 'electron-vite-app',
    required: true,
    validate(value) {
      if (existsSync(value)) return 'A folder with that name already exists.';
      if (value.startsWith('.')) return 'The project name cannot start with ".".';
      if (value.length < 3) return 'The name must be at least 3 characters long.';
      if (value.length > 30) return 'The name cannot be longer than 30 characters.';
      if (!/^[a-zA-Z0-9\-_]+$/.test(value))
        return 'Only letters, numbers, and the symbols "-" and "_" are allowed.';
      return true;
    },
  });
}

/**
 * Shows a list of frameworks to choose
 * @returns {Promise<Promise<string> & {cancel: () => void}>}
 */
async function askFramework() {
  return select({
    message: 'Choose a framework:',
    choices: [{ name: 'React', value: 'react' }],
    default: 'react',
  });
}

/**
 * Executes all the prompts
 * @returns {Promise<{projectName: Promise<string>&{cancel: (function(): void)}, framework: Promise<string>&{cancel: (function(): void)}}>}
 */
export async function executePrompts() {
  const projectName = await askProjectName();
  const framework = await askFramework();

  return { projectName, framework };
}
