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
    // try {
    console.info(chalk.green('Fetching your repos'))
    // const resp = await Axios.get(
    //   `https://git.generalassemb.ly/api/v3/users/${username}/repos?per_page=300`,
    //   {
    //     headers: {
    //       Authorization: `token ${token}`
    //     }
    //   }
    // )

    const data: any[] = [
      { id: 1, name: 'test' },
      {
        id: 2,
        name: 'testing'
      },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 }
    ]
    const stack = new Stack(data)
    stack.executeEachItem()
    // await this.createRepoFolder()
    // await this.cloneRepos(resp.data)
    // } catch (error) {
    //   throw error
    // }
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
    // if (!GITHUB_TOKEN && !GITHUB_USERNAME) {
    //   const answers = await this.prompt(this.prompts)
    //   const { token, username } = answers
    //   this.writeTokenToEnv(token, username)
    // } else {
    await this.fetchRepos(GITHUB_TOKEN || '', GITHUB_USERNAME || '')
    // }
  }
}
