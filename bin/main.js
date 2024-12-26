#!/usr/bin/env node
import { execScript } from "../lib/execScript.js"
import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import { createProjectStructure } from "../lib/createProjectStructure.js"

const defaultAppName = "my-app"
const npmInit = "npm init -y"
const installExpress = "npm i express"
const installNodemon = "npm install -D nodemon"
const convertToEs6 = 'npm pkg set type="module"'
const addStartScript = 'npm pkg set scripts.start="node ./src/app.js"'
const addDevScript = 'npm pkg set scripts.dev="nodemon ./src/app.js"'
const main = async () => {
  console.log("Welcome to the Expressjs wrapper!")
  try {
    const rl = readline.createInterface({ input, output })
    const answer = await rl.question(
      `What name would you like for your app name? `
    )
    const appName = answer.length > 1 ? answer : defaultAppName
    const path = await createProjectStructure(appName)
    await execScript(npmInit, path)
    await execScript(installExpress, path)
    await execScript(installNodemon, path)
    await execScript(addStartScript, path)
    await execScript(addDevScript, path)
    await execScript(convertToEs6, path)
    console.log(`${appName}  has been created...`)
    console.log(`Now cd ${appName} and run npm run dev`)
    console.log(`Happy coding mate!`)
    // Close the readline interface
    rl.close()
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

main()
