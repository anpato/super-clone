import { writeFile, mkdir } from 'fs'
const Axios: any = require('axios')
import { GITHUB_TOKEN, GITHUB_USERNAME } from '../env/env'
import Stack from '../tools/Stack'
const chalk: any = require('chalk')
const Ora: any = require('ora')
export default class InquirerController {
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
        const repos = await this.fetchRepos(token, username)
        await this.cloneRepos(repos)
      }
    )
  }

  private fetchRepos = async (token: string, username: string) => {
    const throbber = Ora(chalk.green('Fetching your repos.')).start()
    try {
      let page: number = 1
      let repos: object[] = []
      const initial = await Axios.get(
        `https://git.generalassemb.ly/api/v3/user/repos?page=1&per_page=100&visibility=all`,
        {
          headers: {
            Authorization: `token ${token}`
          }
        }
      )
      await this.createRepoFolder()
      const maxPage = this.parseHeaders(initial.headers.link)
      while (page < maxPage) {
        const resp = await Axios.get(
          `https://git.generalassemb.ly/api/v3/users/${username}/repos?page=${page}&per_page=100&visibility=all`,
          {
            headers: {
              Authorization: `token ${token}`
            }
          }
        )
        repos.push(...resp.data)
        page++
      }
      return repos
    } catch (error) {
      throw error
    } finally {
      throbber.stopAndPersist({
        text: 'Finished fetching repos.'
      })
    }
  }

  private cloneRepos = async (repos: any[]) => {
    const throbber = Ora(chalk.green('Cloning your repos.')).start()
    const stack = new Stack(repos)
    stack.executeEachItem()
    throbber.stopAndPersist({
      text: 'Finished cloning repos.'
    })
  }

  private parseHeaders = (headers: any) => {
    const arrayOfHeaders = headers.split(',')
    let lastPageHeader: any = arrayOfHeaders.filter((header: string) => {
      if (header.includes('rel="last"')) {
        return header.toString()
      }
    })
    return parseInt(lastPageHeader[0].split('page')[1].replace(/[=&per_]/g, ''))
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
      const repos = await this.fetchRepos(
        GITHUB_TOKEN || '',
        GITHUB_USERNAME || ''
      )
      await this.cloneRepos(repos)
    }
  }
}
