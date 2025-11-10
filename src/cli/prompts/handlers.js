import { existsSync } from 'fs';
import chalk from 'chalk';

/* Checks if the command contains a name as argument,
in which case, creates the project with the
name introduced, or uses the current directory */
export async function checkArgs() {
  const argName = process.argv[2]?.trim();

  if (argName !== undefined) {
    if (argName === '.') return '.';

    if (existsSync(argName)) throw new Error('> A folder with that name already exists.');
    if (argName.startsWith('.')) throw new Error('> The project name cannot start with ".".');
    if (argName.length < 3) throw new Error('> The name must be at least 3 characters long.');
    if (argName.length > 30) throw new Error('> The name cannot be longer than 30 characters.');
    if (!/^[a-zA-Z0-9\-_]+$/.test(argName))
      throw new Error('> Only letters, numbers, and the symbols "-" and "_" are allowed.');

    return argName;
  }
}

/* Handles the canceled operation errors
of the prompts */
export async function safePrompt(prompt) {
  try {
    return await prompt();
  } catch (err) {
    console.log(chalk.red('❌ Operation canceled.'));
    process.exit(1);
  }
}
