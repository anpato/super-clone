import { writeFile, mkdir } from 'fs'

const Axios: any = require('axios')
import { GITHUB_TOKEN, GITHUB_USERNAME } from '../env/env'
import Stack from '../tools/Stack'
const chalk: any = require('chalk')
export default class InquirerController {
  private exec: any
  constructor(private prompt: any, private prompts: object[]) {
    this.prompt = prompt
    this.prompts = prompts
  }

  private writeTokenToEnv = async (token: string, username: string) => {
    writeFile(
      `${process.cwd()}/./.env`,
      `GITHUB_TOKEN=${token} \n GITHUB_USERNAME=${username}`,
      async (err: any) => {
        if (err) throw err
        await this.fetchRepos(token, username)
      }
    )
  }

  private fetchRepos = async (token: string, username: string) => {
    try {
      console.info(chalk.green('Fetching your repos'))
      const resp = await Axios.get(
        `https://git.generalassemb.ly/api/v3/user/repos?page=1&per_page=50&visibility=all`,
        {
          headers: {
            Authorization: `token ${token}`
          }
        }
      )
      console.log(resp.data, resp.data.length)
      // await this.createRepoFolder()
      // const stack = new Stack(resp.data)
      // await stack.executeEachItem()
    } catch (error) {
      throw error
    }
  }

  private createRepoFolder = async () => {
    mkdir(`${process.cwd()}/./repos`, async (err: any) => {
      if (err) return
    })
  }

  public initializePrompt = async () => {
    // if (!GITHUB_TOKEN && !GITHUB_USERNAME) {
    //   const answers = await this.prompt(this.prompts)
    //   const { token, username } = answers
    //   this.writeTokenToEnv(token, username)
    // } else {
    await this.fetchRepos(GITHUB_TOKEN || '', GITHUB_USERNAME || '')
    // }
  }
}
