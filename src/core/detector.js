import fs from 'fs';

export async function detectPackageManager() {
    const userAgent = process.env.npm_config_user_agent;

    if (userAgent?.includes('pnpm')) return 'pnpm';
    if (userAgent?.includes('yarn')) return 'yarn';
    if (userAgent?.includes('bun')) return 'bun';
    if (userAgent?.includes('npm')) return 'npm';

    if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
    if (fs.existsSync('yarn.lock')) return 'yarn';
    if (fs.existsSync('bun.lockb')) return 'bun';
    if (fs.existsSync('package-lock.json')) return 'npm';

    return 'npm';
}
