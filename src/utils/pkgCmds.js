export const installCmds = {
  npm: { cmd: ['install'], flag: '--save-dev' },
  pnpm: { cmd: ['add'], flag: '-D' },
  yarn: { cmd: ['add'], flag: '-D' },
  bun: { cmd: ['install'], flag: '--dev' },
};
