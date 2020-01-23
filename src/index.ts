import { prompt } from 'inquirer'
import InquirerController from './controllers/InquirerController'
import * as interfaces from './middleware/interfaces'

const initialPrompt: interfaces.Prompt = {
  name: 'initialize',
  message: 'Hey there, welcome to Super Clone!'
}
const getInfoPrompt: interfaces.Prompt = {
  name: 'token',
  message: 'Enter your oauth token'
}

const Inquirer = new InquirerController(prompt, [initialPrompt, getInfoPrompt])
Inquirer.intializePrompt()
