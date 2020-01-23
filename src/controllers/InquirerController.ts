import { writeFile } from 'fs'
export default class InquirerController {
  constructor(private prompt: any, private prompts: object[]) {
    this.prompt = prompt
    this.prompts = prompts
  }

  private writeTokenToEnv = (token: string): void => {
    writeFile(`${process.cwd()}/./.env`, `GITHUB_TOKEN=${token}`, err => {
      if (err) throw err
    })
  }

  public intializePrompt = async () => {
    const answers = await this.prompt(this.prompts)
    const { token } = answers
    this.writeTokenToEnv(token)
  }
}
