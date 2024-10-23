import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";
import fs from "fs/promises";

const createReactProject = async (projName) => {
	const pathToProject = path.resolve(process.cwd(), projName);

	try {
		console.log(chalk.yellow("Creating Vite React project...🚀"));
		execSync(`npm create vite@latest ${projName} -- --template react`, { stdio: 'inherit' });

		console.log(chalk.red("Installing dependencies...🛠️"));
		execSync(`npm install`, { cwd: pathToProject, stdio: 'inherit' });

		console.log(chalk.blue("Installing Tailwind CSS and related packages...✨"));
		const devDependencies = [
			"tailwindcss@latest",
			"postcss@latest",
			"autoprefixer@latest",
			"prettier",
			"prettier-plugin-tailwindcss"
		];
		execSync(`npm install -D ${devDependencies.join(" ")}`, { cwd: pathToProject, stdio: 'inherit' });

		console.log(chalk.cyan("Initializing Tailwind CSS...🚀"));
		execSync(`npx tailwindcss init -p`, { cwd: pathToProject, stdio: 'inherit' });

		console.log(chalk.yellowBright("Configuring project and files...🧩"));
		await configureProject(pathToProject);

		console.log(chalk.green("Project created successfully 🎉"));
		console.log(chalk.magenta("Opening project in VSCode..."));
		execSync(`code ${pathToProject}`);

		return true;
	} catch (error) {
		console.error(chalk.red("Error creating React project:"), error.message);
		throw error;
	}
};

async function configureTailwind(projectPath) {
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

	await fs.writeFile(path.join(projectPath, "tailwind.config.js"), tailwindConfig);
	await fs.writeFile(path.join(projectPath, "src", "index.css"), cssDirectives);
}

async function removeUnusedFiles(projectPath) {
	try {
		await fs.unlink(path.join(projectPath, "src", "App.css"));
	} catch (error) {
		console.warn(chalk.yellow("App.css not found or already removed."));
	}
}

async function configureProject(projectPath) {
	await configureTailwind(projectPath);
	await removeUnusedFiles(projectPath);

	const appJSX = `
	import React from 'react'

	function App() {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<h1 className="text-4xl font-bold text-blue-600">
					Welcome to your new React project
				</h1>
			</div>
		)
	}

	export default App
	`;

	const indexHTML = `
	<!DOCTYPE html>
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

	await fs.writeFile(path.join(projectPath, "src", "App.jsx"), appJSX);
	await fs.writeFile(path.join(projectPath, "index.html"), indexHTML);

	// Add a .prettierrc file
	const prettierConfig = `
	{
		"singleQuote": true,
		"semi": false,
		"trailingComma": "es5",
		"tabWidth": 2,
		"plugins": ["prettier-plugin-tailwindcss"]
	}`;
	await fs.writeFile(path.join(projectPath, ".prettierrc"), prettierConfig);
}

export default createReactProject;
