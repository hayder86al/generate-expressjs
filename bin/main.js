#!/usr/bin/env node
import { execScript } from "../lib/execScript.js"
import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import { createProjectStructure } from "../lib/createProjectStructure.js"
import chalk from "chalk"
import ora from "ora"
import inquirer from "inquirer"

const defaultAppName = "my-app"
const npmInit = "npm init -y"
const installExpress = "npm i express"
const installNodemon = "npm install  --save-dev nodemon"
const installDotenv = "npm install dotenv"
const convertToEs6 = 'npm pkg set type="module"'
const addTypeScript =
  "npm install --save-dev typescript @types/node @types/express"

const main = async () => {
  console.log(chalk.cyan.bold("\n🚀 Welcome to the Expressjs wrapper!\n"))
  const spinner = ora("📦 Generating the project...")
  try {
    const rl = readline.createInterface({ input, output })

    const appNameAnswer = await rl.question(
      chalk.yellow(
        `📝 What name would you like for your app? (${defaultAppName}) `
      )
    )
    const appName = appNameAnswer.length > 1 ? appNameAnswer : defaultAppName

    const typeScriptAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "typescript",
        message: chalk.yellow("🔧 Add Typescript support?"),
        choices: ["Yes", "No"],
      },
    ])
    let isTypeScriptSupport = typeScriptAnswer.typescript === "Yes"

    const addStartScript = isTypeScriptSupport
      ? 'npm pkg set scripts.start="node ./dist/app.js"'
      : 'npm pkg set scripts.start="node ./src/app.js"'
    const addDevScript = isTypeScriptSupport
      ? 'npm pkg set scripts.dev="nodemon"'
      : 'npm pkg set scripts.dev="nodemon ./src/app.js"'
    const addBuildScript = 'npm pkg set scripts.build="tsc"'

    console.log(chalk.dim("\n📦 Generating the project...\n"))
    spinner.start()

    const path = await createProjectStructure(appName, isTypeScriptSupport)
    await execScript(npmInit, path)
    await execScript(installExpress, path)
    await execScript(installNodemon, path)
    await execScript(installDotenv, path)
    await execScript(addStartScript, path)
    await execScript(addDevScript, path)

    if (!isTypeScriptSupport) {
      await execScript(convertToEs6, path)
    }

    if (isTypeScriptSupport) {
      await execScript(addBuildScript, path)
      await execScript(addTypeScript, path)
    }

    spinner.succeed("Project generated successfully!")

    console.log(
      chalk.green.bold(`\n✨ ${appName} has been created successfully!\n`)
    )
    console.log(chalk.cyan(`📁 Run the following commands:`))
    console.log(chalk.white(`   cd ${appName}`))
    console.log(chalk.white(`   npm run dev\n`))
    console.log(chalk.green.bold("🎉 Happy coding!\n"))

    rl.close()
  } catch (error) {
    spinner.fail("❌ Error: Project generation failed!")
    console.error(chalk.red.bold(`\n❌ Error: something went wrong!\n`))
  }
}

main()
