import { prompt } from 'inquirer'

export default class InquirerController {
  constructor(private prompt: any, private prompts: object[]) {
    this.prompt = prompt
    this.prompts = prompts
  }

  public intializePrompt = async () => {
    const answers = await this.prompt(this.prompts)
    console.log(answers)
  }
}
