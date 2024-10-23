import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";
import fs from "fs/promises";

const createExpressProject = async (projName) => {
  const pathToProject = path.resolve(process.cwd(), projName);

  try {
    console.log(chalk.yellow("Creating Express app project...🚀"));
    
    // Create project directory
    await fs.mkdir(pathToProject, { recursive: true });
    
    // Initialize npm project
    console.log(chalk.blue("Initializing npm project...📦"));
    execSync(`npm init -y`, { cwd: pathToProject, stdio: 'inherit' });

    // Install dependencies
    console.log(chalk.red("Installing dependencies...🛠️"));
    const dependencies = [
      "express",
      "morgan",
      "dotenv",
      "cors",
      "jsonwebtoken",
      "bcryptjs",
      "mongoose"
    ];
    execSync(`npm install ${dependencies.join(" ")}`, { cwd: pathToProject, stdio: 'inherit' });

    // Install dev dependencies
    console.log(chalk.blue("Installing dev dependencies...✨"));
    execSync(`npm install -D nodemon`, { cwd: pathToProject, stdio: 'inherit' });

    // Create basic project structure
    await createProjectStructure(pathToProject);

    console.log(chalk.green("Project created successfully 🎉"));
    console.log(chalk.magenta("Opening project in VSCode..."));
    execSync(`code ${pathToProject}`);

    return true;
  } catch (error) {
    console.error(chalk.red("Error creating Express project:"), error.message);
    throw error;
  }
};

async function createProjectStructure(projectPath) {
  const dirs = ['src', 'src/routes', 'src/controllers', 'src/models', 'src/middleware'];
  for (const dir of dirs) {
    await fs.mkdir(path.join(projectPath, dir), { recursive: true });
  }

  // Create a basic server.js file
  const serverContent = `
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to your Express API!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;

  await fs.writeFile(path.join(projectPath, 'src', 'server.js'), serverContent);

  // Update package.json with start and dev scripts
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
  packageJson.scripts = {
    ...packageJson.scripts,
    start: "node src/server.js",
    dev: "nodemon src/server.js"
  };
  packageJson.type = "module";  // Enable ES modules
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

export default createExpressProject;
