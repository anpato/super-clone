import { RepoParams } from '../middleware/interfaces'
const chalk: any = require('chalk')
export const Clone = async (params: RepoParams, exec: any) => {
  await exec(`cd ./repos && git clone ${params.cloneUrl}`, (err: any) => {
    if (err)
      return console.info(chalk.red(`${params.name} already exists! Skipping.`))
    console.info(chalk.green(`Cloning ${params.name}`))
  })
}
