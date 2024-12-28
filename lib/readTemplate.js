import { join, dirname } from "path"
import { readFile } from "fs/promises"
import { fileURLToPath } from "url"

// Get the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const readTemplate = async templateFileName => {
  try {
    const templatePath = join(__dirname, `./templates/${templateFileName}`)
    const templateContent = await readFile(templatePath, "utf-8")
    return templateContent
  } catch (error) {
    throw new Error(`Failed to read template: ${error.message}`)
  }
}
