#! /usr/bin/env node

import chalk from "chalk";
import { Separator, input, select } from "@inquirer/prompts";
import banner from "./banner.js";
import createReactProject from "./projects/createReactApp.js";
import createExpressProject from "./projects/createExpressProject.js";

process.on("unhandledRejection", (err) => {
  console.log(chalk.red("Error creating project 😢😢😢"));
  process.exit(1);
});

process.on("SIGINT", () => {
  process.exit(1);
});

console.log(chalk.green(banner));

console.log(chalk.bgRedBright(`Welcome to the create-project CLI`));

const projectName = await input({
  message: chalk.blue("Enter the project name ❓: "),
});

const projectType = await select({
  message: "Select project type ⚙️",
  choices: [
    {
      name: "React",
      value: "react",
      description:
        " React is a JavaScript library for building user interfaces",
    },
    {
      name: "Express",
      value: "express",
      description:
        " Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
    },
  ],
});

switch (projectType) {
  case "react":
    createReactProject(projectName);
    break;
  case "express":
    createExpressProject(projectName);
    break;
  default:
    console.log(chalk.red("Error creating project 😢😢😢"));
    break;
}
