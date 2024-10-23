#! /usr/bin/env node

import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import banner from "./banner.js";
import createExpressProject from "./projects/createExpressProject.js";
import createReactProject from "./projects/createReactApp.js";

// Improved error handling
process.on("unhandledRejection", (err) => {
  console.error(chalk.red("Error creating project:"), err);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log(chalk.yellow("\nProcess terminated by user."));
  process.exit(0);
});

async function main() {
  console.log(chalk.yellowBright(banner));
  console.log(chalk.bgRedBright(`Welcome to the make-project CLI`));

  const projectName = await input({
    message: chalk.blue("Enter the project name ❓: "),
    validate: (input) => input.trim() !== "" || "Project name cannot be empty",
  });

  const projectType = await select({
    message: "Select project type ⚙️",
    choices: [
      {
        name: "React",
        value: "react",
        description: "React is a JavaScript library for building user interfaces",
      },
      {
        name: "Express",
        value: "express",
        description: "Express is a minimal and flexible Node.js web application framework",
      },
    ],
  });

  try {
    switch (projectType) {
      case "react":
        await createReactProject(projectName);
        break;
      case "express":
        await createExpressProject(projectName);
        break;
      default:
        throw new Error(`Unsupported project type: ${projectType}`);
    }
    console.log(chalk.green(`✅ Project "${projectName}" created successfully!`));
  } catch (error) {
    console.error(chalk.red(`Error creating project: ${error.message}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(chalk.red("Unexpected error:"), err);
  process.exit(1);
});
