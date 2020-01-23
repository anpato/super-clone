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
const getTokenPrompt: interfaces.Prompt = {
  name: 'token',
  message: 'Enter your oauth token'
}

const getGithubUrl: interfaces.Prompt = {
  type: 'list',
  name: 'url',
  message: 'Is this an enterprise Github account or public Github account?',
  choices: ['Public', 'Enterprise']
}

const getUsername: interfaces.Prompt = {
  name: 'username',
  message: "Whats's your github username?"
}

const prompts: object[] = [
  initialPrompt,
  getGithubUrl,
  getTokenPrompt,
  getUsername
]

const Inquirer = new InquirerController(prompt, prompts)
Inquirer.intializePrompt()
