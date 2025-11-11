import { checkArgs, safePrompt } from './handlers.js';
import { confirm, input, select } from '@inquirer/prompts';
import { existsSync } from 'fs';

/* Asks if the user wants to remove the files
of a directory */
export async function askClearDirectory() {
  return confirm({
    message: 'Current directory is not empty. Remove existing files and continue?',
    default: false,
  });
}

/* Asks the name of the project or takes it from
the command's args */
async function askProjectName() {
  const name = await checkArgs();
  if (name) return name;

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

/* Shows a list of frameworks to choose
and install */
async function askFramework() {
  return select({
    message: 'Choose a framework:',
    choices: [{ name: 'React', value: 'react' }],
    default: 'react',
  });
}

/* Asks if the user wants to install Tailwind CSS */
async function askTailwind() {
  return confirm({
    message: 'Do you want to add Tailwind?',
    default: false,
  });
}

const prompts = {
  projectName: askProjectName,
  framework: askFramework,
  //tailwind: askTailwind,
};

/* Executes all the prompts */
export async function executePrompts() {
  const answers = {};

  for (const [key, fn] of Object.entries(prompts)) {
    answers[key] = await safePrompt(fn);
  }

  return answers;
}
