export const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Electron-vite + Vanilla</title>
  </head>
  <body>
    <script type="module" src="./index.ts"></script>
  </body>
</html>
`;

export const index = `const heading = document.querySelector('h1');
heading.textContent = 'Hello App!';`;
