export const installCmds = {
  npm: { manager: ['install'], flag: '--save-dev' },
  pnpm: { manager: ['add'], flag: '-D' },
  yarn: { manager: ['add'], flag: '-D' },
  bun: { manager: ['install'], flag: '--dev' },
};
