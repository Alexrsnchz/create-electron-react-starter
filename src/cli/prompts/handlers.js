import { readdir, rm } from 'fs/promises';
import path from 'path';
import { failSpinner, startSpinner, successSpinner } from '../../utils/logger.js';
import { askClearDirectory } from './prompts.js';
import chalk from 'chalk';
import { existsSync } from 'fs';

/* Removes every file of the directory indicated */
async function directoryClear(targetDir, files) {
  try {
    startSpinner('🚧  Removing existing files...');

    for (const file of files) {
      await rm(path.join(targetDir, file), { recursive: true, force: true });
    }

    successSpinner('Files removed successfully.');
  } catch (err) {
    failSpinner('Error removing files.');
    throw err;
  }
}

/* Checks if the current directory is empty,
in which case, asks if the user wants to
remove all files or cancel*/
async function checkDirectory() {
  const currentDir = process.cwd();
  const files = await readdir(currentDir);

  if (files.length > 0) {
    const removeFiles = await safePrompt(askClearDirectory);

    if (removeFiles === undefined || removeFiles === false) {
      console.log(chalk.red('❌ Operation canceled.'));
      process.exit(1);
    }

    if (removeFiles) await directoryClear(currentDir, files);
  }
}

/* Checks if the CLI received a name argument,
in which case, creates the project with the
name introduced, or uses the current directory */
export async function checkArgs() {
  const argName = process.argv[2]?.trim();

  if (!argName) return;

  if (argName === '.') {
    await checkDirectory();
    return '.';
  }

  if (existsSync(argName)) throw new Error('> A folder with that name already exists.');
  if (argName.startsWith('.')) throw new Error('> The project name cannot start with ".".');
  if (argName.length < 3) throw new Error('> The name must be at least 3 characters long.');
  if (argName.length > 30) throw new Error('> The name cannot be longer than 30 characters.');
  if (!/^[a-zA-Z0-9\-_]+$/.test(argName))
    throw new Error('> Only letters, numbers, and the symbols "-" and "_" are allowed.');

  return argName;
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
