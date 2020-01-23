// import commander from 'commander'
import { prompt } from 'inquirer'

interface Prompt {
  name: string
  message: string
}

const initialPrompt: Prompt = {
  name: 'initialize',
  message: 'Hey there, welcome to Super Clone!'
}
const getInfoPrompt: Prompt = {
  name: 'token',
  message: 'Enter your oauth token'
}

prompt(initialPrompt).then((answers: object) => console.log(answers))
