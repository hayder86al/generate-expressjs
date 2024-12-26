import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

export async function createProjectStructure(folderName) {
  try {
    // Get the current directory and join it with the new folder name
    const folderPath = join(process.cwd(), folderName)
    await mkdir(folderPath, { recursive: true })
    // Create the .gitignore file
    const gitIgnorePath = join(folderPath, ".gitignore")
    await writeFile(
      gitIgnorePath,
      `
### Node ###
node_modules/
npm-debug.log
yarn-error.log

### Environment Variables ###
.env
.env.local
.env.*.local

### Logs ###
logs
*.log
log/
*.gz

### Editor ###
*.swp
*~
.vscode/
.idea/
.DS_Store

### OS ###
Thumbs.db

### Dependency directories ###
/node_modules
/bower_components

### Build artifacts ###
dist/
coverage/

### Misc ###
*.bak
*.tmp

### Testing ###
/coverage/
/.nyc_output
/junit.xml

### Typescript ###
*.tsbuildinfo

### PM2 ###
pm-process.json
pm-process.log

### Optional ###
public/uploads
public/images`
    )
    const srcPath = join(folderPath, "src")
    await mkdir(srcPath, { recursive: true })
    const appPath = join(srcPath, "app.js")
    await writeFile(
      appPath,
      `
      import express from "express"

      const app = express()
      const port = 3000

      app.get("/", (req, res) => {
        res.send("Hello World!")
      })

      app.listen(port, () => {
        console.log("Example app listening on port:" + port)
      })
      `,
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
