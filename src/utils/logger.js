import ora from 'ora';
import chalk from 'chalk';

let spinner = null;

export function startSpinner(message) {
    spinner = ora({
        text: chalk.cyan(message),
        color: 'cyan',
        spinner: 'dots',
    }).start();
}

export function successSpinner(message) {
    if (spinner) {
        spinner.succeed(chalk.white(message));
        spinner = null;
    } else {
        success(message);
    }
}

export function failSpinner(message) {
    if (spinner) {
        spinner.fail(chalk.white(message));
        spinner = null;
    } else {
        error(message);
    }
}

export function log(message) {
    console.log('\n' + message + '\n');
}

function success(message) {
    console.log(`${chalk.cyan('✔')} ${chalk.gray(message)}\n`);
}

export function error(message) {
    console.log(chalk.red(message.charAt(0).toUpperCase() + message.slice(1)));
}

export function steps(projectName, pkgManager) {
    log(chalk.white('─────────────────────────────────'));

    console.log(chalk.bold.cyan(`Your Electron project is ready!\n`));

    console.log(`${chalk.cyan('👉  cd')} ${chalk.white(projectName)}`);
    console.log(chalk.cyan(`⚡️  ${pkgManager} run ${chalk.white('dev')}`));

    log(chalk.white('─────────────────────────────────'));
}
