import { prompt } from 'inquirer'
import InquirerController from './controllers/InquirerController'
import * as interfaces from './middleware/interfaces'
import * as chalk from 'chalk'

const url = new URL('https://github.com/settings/tokens')

const initialPrompt: interfaces.Prompt = {
  name: 'initialize',
  message: `Hey there, welcome to Super Clone! To get started visit ${chalk.green(
    url
  )} to create a new Github Personal Access Token. Press enter/return once completed.`
}
const getInfoPrompt: interfaces.Prompt = {
  name: 'token',
  message: 'Enter your oauth token'
}

const prompts: object[] = [initialPrompt, getInfoPrompt]

const Inquirer = new InquirerController(prompt, prompts)
Inquirer.intializePrompt()
