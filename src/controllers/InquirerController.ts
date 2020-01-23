import { writeFile, mkdir } from 'fs'
import { promisify } from 'util'
import { exec } from 'child_process'
import Axios from 'axios'
import { GITHUB_TOKEN, GITHUB_USERNAME } from '../env'
export default class InquirerController {
  // private githubType: string
  private exec: any
  constructor(private prompt: any, private prompts: object[]) {
    this.prompt = prompt
    this.prompts = prompts
    // this.githubType = ''
    this.exec = promisify(exec)
  }

  private writeTokenToEnv = async (token: string, username: string) => {
    writeFile(
      `${process.cwd()}/./.env`,
      `GITHUB_TOKEN=${token} \n GITHUB_USERNAME=${username}`,
      async err => {
        if (err) throw err
        await this.fetchRepos()
      }
    )
  }

  private fetchRepos = async () => {
    try {
      const resp = await Axios.get(
        `https://git.generalassemb.ly/api/v3/users/${GITHUB_USERNAME}/repos?per_page=300`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`
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
    let incrementor: number = repos.length
    repos.forEach(async (repo: any) => {
      await this.exec(
        `cd ./repos && git clone ${repo.clone_url}`,
        (err: any) => {
          if (err) return
          incrementor--
        }
      )
      if (incrementor === 0) return process.exit()
    })
  }

  private createRepoFolder = async () => {
    mkdir(`${process.cwd()}/./repos`, async err => {
      if (err) return
      await this.fetchRepos()
    })
  }

  public intializePrompt = async () => {
    if (!GITHUB_TOKEN && !GITHUB_USERNAME) {
      const answers = await this.prompt(this.prompts)
      const { token, username } = answers
      this.writeTokenToEnv(token, username)
    } else {
      await this.fetchRepos()
    }
  }
}
