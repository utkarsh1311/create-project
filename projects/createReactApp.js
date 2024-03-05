import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";
import { unlinkSync, writeFileSync } from "fs";

const createReactProject = async (projName) => {
  const pathToProject = path.resolve(process.cwd(), projName);

  try {
    console.log(chalk.yellow("Creating vite React project...🚀🚀🚀"));
    execSync(`npm create vite@latest ${projName} -- --template react`);

    console.log(chalk.red("Installing dependencies...🛠️🛠️🛠️"));
    execSync(`cd ${pathToProject} && npm install`);

    console.log(chalk.blue("Installing tailwindcss...✨✨✨"));
    execSync(
      `cd ${pathToProject} && npm i -D tailwindcss@latest postcss@latest autoprefixer@latest prettier prettier-plugin-tailwind`
    );

    console.log(chalk.cyan("Initializing tailwindcss...🚀🚀🚀"));
    execSync(`cd ${pathToProject} && npx tailwindcss init -p`);

    console.log(chalk.yellowBright("Configuring project and files... 🧩🧩🧩"));
    configureProject(pathToProject);

    console.log(chalk.bgGreenBright("Project created successfully 🎉🎉🎉"));
    console.log(chalk.bgRedBright("Opening project in VSCode...🚀🚀🚀"));
    execSync(`cd ${pathToProject} && code .`);
  } catch (error) {
    console.log(chalk.red("Error creating project 😢😢😢"));
  }
};

const configureTailwind = (pathToProject) => {
  const tailwindConfig = `
  /** @type {import('tailwindcss').Config} */
  export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  const cssDirectives = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

  const tailwindConfigFile = path.resolve(pathToProject, "tailwind.config.js");
  writeFileSync(tailwindConfigFile, tailwindConfig);

  const indexCSSFile = path.resolve(pathToProject, "src", "index.css");
  writeFileSync(indexCSSFile, cssDirectives);
};

const removeUnusedFiles = (pathToProject) => {
  const pathToAppCSS = path.resolve(pathToProject, "src", "App.css");

  unlinkSync(pathToAppCSS);
};

const configureProject = (pathToProject) => {
  configureTailwind(pathToProject);
  removeUnusedFiles(pathToProject);
  const pathToAppJS = path.resolve(pathToProject, "src", "App.jsx");
  const pathToIndexHTML = path.resolve(pathToProject, "index.html");

  const appJS = `
  function App() {
    return (
        <div>
            <h1>Welcome to your new React project</h1>
        </div>
    )
  }
export default App;
`;

  const indexHTML = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

  writeFileSync(pathToAppJS, appJS);
  writeFileSync(pathToIndexHTML, indexHTML);
};
export default createReactProject;
