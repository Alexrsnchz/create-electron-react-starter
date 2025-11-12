import { baseDeps, frameworkDeps } from './depsData.js';

export function getDependencies(framework) {
  const fw = frameworkDeps[framework] || { deps: [], devDeps: [] };

  return {
    deps: [...baseDeps.deps, ...fw.deps],
    devDeps: [...baseDeps.devDeps, ...fw.devDeps],
  };
}
