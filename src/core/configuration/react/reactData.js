export const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Electron-vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
`;

export const index = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

export const app = `export default function App() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>⚡ Electron + Vite + React</h1>
      <p>Thanks for using my template. Happy coding!</p>
    </div>
  );
}`;
