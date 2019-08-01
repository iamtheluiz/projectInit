/**
 * GitHub access token
 */

const Octokit = require('@octokit/rest');
const Configstore = require('configstore');
const pkg = require('../package.json');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

// Our libs
const inquirer = require('./inquirer');

// Set application information storage
const conf = new Configstore(pkg.name);

let octokit = new Octokit();

module.exports = {
  githubAuth: (token) => {
    octokit = Octokit({
      auth: token
    });
  },
  
  getInstance: () => {
    return octokit;
  },

  getStoredGithubToken: () => {
    return conf.get('github.token');
  },

  setGithubCredentials: async () => {
    // Get user credentials
    const { username, password } = await inquirer.askGithubCredentials();

    // Github authentication
    octokit = Octokit({
      auth: {
        username,
        password
      }
    });
  },

  registerNewToken: async () => {
    // Spinning bar
    const status = new Spinner('Authentication you, please wait...');
    status.start();

    try {
      // Get a authorization
      const response = await octokit.oauthAuthorizations.createAuthorization({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'ProjectInit, the CLI to initialize git repositories!'
      });

      // Receive token
      const token = response.data.token;

      if (token) {
        conf.set('github.token', token);  // Store token
        return token;
      } else {
        throw new Error("Missing Token", "Github token was not found in the response");
      }
    } catch (err) {
      throw err;
    } finally {
      // Stop spinning bar
      status.stop();
    }
  }
}