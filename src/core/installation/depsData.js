export const baseDeps = {
  deps: [],
  devDeps: ['electron', 'vite', 'electron-vite', 'typescript', '@types/node'],
};

export const frameworkDeps = {
  react: {
    deps: ['react', 'react-dom'],
    devDeps: ['@vitejs/plugin-react-swc', '@types/react', '@types/react-dom'],
  },
};
