import { exec } from "child_process"

export const execScript = (command, path = process.cwd()) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: path }, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}
