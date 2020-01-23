#!/usr/bin/env node
import inquirer = require('inquirer')
import commander = require('commander')
import * as interfaces from './middleware/interfaces'
import chalk = require('chalk')
const { InquirerController } = require('./controllers/InquirerController')

const url: string = 'https://git.generalassemb.ly/settings/tokens'

const initialPrompt: interfaces.Prompt = {
  name: 'initialize',
  message: `Hey there, welcome to Super Clone for General Assembly! To get started visit ${chalk.greenBright(
    url
  )} to create a new Github Personal Access Token. For instructions on how to create a new personal access token, view the Getting Started section in the documentation! Press enter/return once completed.`
}
const getTokenPrompt: interfaces.Prompt = {
  name: 'token',
  message: 'Enter your oauth token'
}
const getUsername: interfaces.Prompt = {
  name: 'username',
  message: "Whats's your github username?"
}

const selectReposToClone: interfaces.Prompt = {
  type: 'list',
  name: 'choice',
  message: 'Would you like to clone down your forked repos or the class repos?',
  choices: ['Personal', 'Class Repos']
}

const selectLocation: interfaces.Prompt = {
  type: 'list',
  name: 'location',
  message: 'Which campus did you attend?',
  choices: ['NYC']
}

const typeOfCourse: interfaces.Prompt = {
  type: 'list',
  name: 'courseType',
  message: 'Was this an SEI or WDI course?',
  choices: ['SEI', 'WDI']
}

const prompts: object[] = [
  initialPrompt,
  getTokenPrompt,
  getUsername
  //   selectReposToClone,
  //   selectLocation,
  //   typeOfCourse
]

const Inquirer = new InquirerController(inquirer.prompt, prompts)
commander.version('1.0.0').description('Super Cloner')
commander
  .command('start')
  .alias('-s')
  .description('Start Super Cloner')
  .action(() => Inquirer.intializePrompt())

commander.parse(process.argv)
