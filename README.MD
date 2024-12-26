# Generate ExpressJS

Generate ExpressJS is a CLI app that creates an ExpressJS boilerplate project. This tool helps you quickly set up a new ExpressJS application with a predefined structure and necessary configurations.

## Features

- Creates a new project directory with the specified name.
- Initializes a new Node.js project with `npm init`.
- Installs ExpressJS and Nodemon.
- Sets up a basic ExpressJS server in `src/app.js` or `src/app.ts` if TypeScript support is enabled.
- Configures start and development scripts in `package.json`.
- Adds a `.gitignore` file with common Node.js and project-specific ignores.
- Optionally adds TypeScript support with a `tsconfig.json` file.

## Installation

You can use `npx` to run the CLI without installing it globally:

```sh
npx generate-expressjs
```

## Usage

Run the CLI and follow the prompts to create your ExpressJS project:

```sh
npx generate-expressjs
```

You will be asked to provide a name for your app and whether you want to add TypeScript support.

## Running the Project

Navigate to your project directory and start the development server:

```sh
cd your-app-name
npm run dev
```

If you added TypeScript support, the TypeScript files will be compiled before starting the server.