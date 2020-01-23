import { writeFile, mkdir } from 'fs'
import { promisify } from 'util'
import { exec } from 'child_process'
import Axios from 'axios'
export default class InquirerController {
  private token: string
  private username: string
  private githubType: string
  private exec: any
  constructor(private prompt: any, private prompts: object[]) {
    this.prompt = prompt
    this.prompts = prompts
    this.token = ''
    this.username = ''
    this.githubType = ''
    this.exec = promisify(exec)
  }

  private writeTokenToEnv = (token: string): void => {
    this.token = token
    this.prompts.splice(0, 2)
    writeFile(`${process.cwd()}/./.env`, `GITHUB_TOKEN=${token}`, err => {
      if (err) throw err
      this.setUpGithubConnection(token)
    })
  }

  private fetchRepos = async () => {
    try {
      const resp = await Axios.get(
        `https://git.generalassemb.ly/api/v3/users/${this.username}/repos`,
        {
          headers: {
            Authorization: `token ${this.token}`
          }
        }
      )
      await this.cloneRepos(resp.data)
    } catch (error) {
      throw error
    }
  }

  private cloneRepos = async (repos: object[]) => {
    mkdir(`${process.cwd()}/./repos`, async err => {
      if (err) return
    })
    repos.forEach(async (repo: any) => {
      try {
        await this.exec(
          `cd ./repos && git clone ${repo.clone_url}`,
          (err: any) => {
            if (err) {
            }
          }
        )
      } catch (error) {
        return
      }
    })
  }

  private setUpGithubConnection = async (token: string) => {
    const typeOfGithub = await this.prompt(this.prompts)
    console.log(typeOfGithub)
  }

  public intializePrompt = async () => {
    const answers = await this.prompt(this.prompts)
    const { token, username } = answers
    this.token = token
    this.username = username
    await this.fetchRepos()
  }
}
