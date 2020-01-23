import { writeFile, mkdir } from 'fs'
import { promisify } from 'util'
import { exec } from 'child_process'
const Axios: any = require('axios')
import { GITHUB_TOKEN, GITHUB_USERNAME } from '../env/env'
const chalk: any = require('chalk')
export default class InquirerController {
  private exec: any
  constructor(private prompt: any, private prompts: object[]) {
    this.prompt = prompt
    this.prompts = prompts
    this.exec = promisify(exec)
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
        `https://git.generalassemb.ly/api/v3/users/${username}/repos?per_page=300`,
        {
          headers: {
            Authorization: `token ${token}`
          }
        }
      )
      await this.createRepoFolder()
      await this.cloneRepos(resp.data)
    } catch (error) {
      throw error
    }
  }

  private cloneRepos = async (repos: any[]) => {
    console.info(chalk.green('Cloning Repos'))
    let incrementor: number = repos.length
    repos.forEach(async (repo: any) => {
      await this.exec(
        `cd ./repos && git clone ${repo.clone_url}`,
        (err: any) => {
          if (err) return
          incrementor--
        }
      )
    })
    console.info(chalk.green('Repos cloned'))
  }

  private createRepoFolder = async () => {
    mkdir(`${process.cwd()}/./repos`, async (err: any) => {
      if (err) return
    })
  }

  public initializePrompt = async () => {
    if (!GITHUB_TOKEN && !GITHUB_USERNAME) {
      const answers = await this.prompt(this.prompts)
      const { token, username } = answers
      this.writeTokenToEnv(token, username)
    } else {
      await this.fetchRepos(GITHUB_TOKEN || '', GITHUB_USERNAME || '')
    }
  }
}
