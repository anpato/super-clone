import { prompt } from 'inquirer'

export default class InquirerController {
  constructor(private prompt: any) {
    this.prompt = prompt
  }

  private intializePrompt = () => {
    console.log(this.prompt)
  }
}
