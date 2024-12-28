import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { readTemplate } from "../lib/readTemplate.js"

export async function createProjectStructure(folderName, isTypescriptSupport) {
  try {
    const folderPath = join(process.cwd(), folderName)
    await mkdir(folderPath, { recursive: true })

    const appjsTemplate = await readTemplate("appjs")
    const apptsTemplate = await readTemplate("appts")
    const gitignoreTemplate = await readTemplate("gitignore")
    const nodemonTemplate = await readTemplate("nodemon")
    const tsconfigTemplate = await readTemplate("tsconfig")
    const envTemplate = await readTemplate("env")

    if (isTypescriptSupport) {
      const tsconfigPath = join(folderPath, "tsconfig.json")
      await writeFile(tsconfigPath, tsconfigTemplate, "utf8")
      const nodemonPath = join(folderPath, "nodemon.json")
      await writeFile(nodemonPath, nodemonTemplate, "utf8")
    }

    const envPath = join(folderPath, ".env")
    await writeFile(envPath, envTemplate, "utf8")

    const gitIgnorePath = join(folderPath, ".gitignore")
    await writeFile(gitIgnorePath, gitignoreTemplate, "utf8")

    const srcPath = join(folderPath, "src")
    await mkdir(srcPath, { recursive: true })
    const appPath = join(srcPath, isTypescriptSupport ? "app.ts" : "app.js")
    await writeFile(
      appPath,
      isTypescriptSupport ? apptsTemplate : appjsTemplate,
      "utf8"
    )

    return folderPath
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(`Folder '${folderName}' already exists`)
      return join(process.cwd(), folderName)
    }
    console.error(`Error creating folder: ${error.message}`)
    throw error
  }
}
