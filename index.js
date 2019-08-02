#! /usr/bin/env node
const chalk = require('chalk');   // Color to output
const clear = require('clear');   // Clears terminal
const figlet = require('figlet');  // Generate a ASCII Banner

// Out libs
const files = require('./lib/files');
const github = require('./lib/github');
const repo = require('./lib/repo');

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
if (files.directoryExists('.git')) {
  // Display "error" message
  console.log(chalk.red('This folder already is a git respository!'));
  // Quit node application
  process.exit();
}

const getGithubToken = async () => {
  // Fetch token from config store
  let token = github.getStoredGithubToken();
  if (token) {
    return token;
  }

  // Register a new token
  await github.setGithubCredentials();      // Get user credentials
  token = await github.registerNewToken();  // Register a new token

  return token;
}

const run = async () => {
  try {
    // Get and set Authentication Token
    const token = await getGithubToken();
    github.githubAuth(token);

    // Create remote repository
    const url = await repo.createRemoteRepo();

    // Create gitignore file
    await repo.createGitignore();

    // Set up local repository and push to remote
    const done = await repo.setupRepo(url);
    if (done) {
      console.log(chalk.green('All done!'));
    }
  } catch (err) {
    if (err) {
      switch (err.code) {
        case 401:
          console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
          break;

        case 422:
          console.log(chalk.red('There already exists a remote repository with the same name'));
          break;

        default:
          console.log(err);
      }
    }
  }
}

run();