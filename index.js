const chalk   = require('chalk');   // Color to output
const clear   = require('clear');   // Clears terminal
const figlet  = require('figlet');  // Generate a ASCII Banner

// Out libs
const files  = require('./lib/files');
const github = require('./lib/github');

/* Application Start */

clear();  // Clear terminal

// Show Project Banner
console.log(
  chalk.yellow( // Yellow font color
    // Generate Project Banner
    figlet.textSync('ProjectInit', { horizontalLayout: 'full' })
  )
);

// Check if this folder is a git repository
if (files.directoryExists('.git')){
  // Display "error" message
  console.log(chalk.red('This folder already is a git respository!'));
  // Quit node application
  process.exit();
}

const run = async () => {
  // Try to get the GitHub Token
  let token = github.getStoredGithubToken();

  if(!token){ // If the token not exists
    await github.setGithubCredentials();      // Get user credentials
    token = await github.registerNewToken();  // Register a new token
  }
}

run();