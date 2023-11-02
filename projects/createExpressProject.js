import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";

const createExpressProject = async (projName) => {
  const pathToProject = path.resolve(process.cwd(), projName);

  try {
    console.log(chalk.yellow("Creating Express app project...🚀🚀🚀"));
    execSync(`mkdir ${projName} && cd ${projName} && npm init -y`);

    console.log(chalk.red("Installing dependencies...🛠️🛠️🛠️"));
    execSync(
      `cd ${pathToProject} && npm install express morgan dotenv cors jsonwebtoken bcryptjs mongoose`
    );

    console.log(chalk.blue("Installing dev dependencies...✨✨✨"));
    execSync(`cd ${pathToProject} && npm i -D nodemon `);

    console.log(chalk.bgGreenBright("Project created successfully 🎉🎉🎉"));
    console.log(chalk.bgRedBright("Opening project in VSCode...🚀🚀🚀"));
    execSync(`cd ${pathToProject} && code .`);
  } catch (error) {
    console.log(chalk.red("Error creating Express project 😢😢😢"));
  }
};

export default createExpressProject;
