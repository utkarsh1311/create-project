import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";

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

    console.log(chalk.bgGreenBright("Project created successfully 🎉🎉🎉"));
    console.log(chalk.bgRedBright("Opening project in VSCode...🚀🚀🚀"));
    execSync(`cd ${pathToProject} && code .`);
  } catch (error) {
    console.log(chalk.red("Error creating project 😢😢😢"));
  }
};

export default createReactProject;
