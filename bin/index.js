"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var InquirerController_1 = require("./controllers/InquirerController");
var chalk = require("chalk");
var url = new URL('https://git.generalassemb.ly/settings/tokens');
var initialPrompt = {
    name: 'initialize',
    message: "Hey there, welcome to Super Clone for General Assembly! To get started visit " + chalk.green(url) + " to create a new Github Personal Access Token. For instructions on how to create a new personal access token, view the Getting Started section in the documentation! Press enter/return once completed."
};
var getTokenPrompt = {
    name: 'token',
    message: 'Enter your oauth token'
};
var getUsername = {
    name: 'username',
    message: "Whats's your github username?"
};
var selectReposToClone = {
    type: 'list',
    name: 'choice',
    message: 'Would you like to clone down your forked repos or the class repos?',
    choices: ['Personal', 'Class Repos']
};
var selectLocation = {
    type: 'list',
    name: 'location',
    message: 'Which campus did you attend?',
    choices: ['NYC']
};
var typeOfCourse = {
    type: 'list',
    name: 'courseType',
    message: 'Was this an SEI or WDI course?',
    choices: ['SEI', 'WDI']
};
var prompts = [
    initialPrompt,
    getTokenPrompt,
    getUsername
    //   selectReposToClone,
    //   selectLocation,
    //   typeOfCourse
];
var Inquirer = new InquirerController_1.default(inquirer_1.prompt, prompts);
Inquirer.intializePrompt();
