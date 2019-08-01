const _       = require('lodash');
const fs      = require('fs');
const git     = require('simple-git')();
const CLI     = require('clui');
const touch   = require('touch');
const Spinner = CLI.Spinner;

// Our libs
const inquirer = require('./inquirer');
const gh = require('./github');

module.exports = {
  createRemoteRepo: async () => {
    const github = gh.getInstance();
    const { name, description, visibility } = await inquirer.askRepoDetails();

    const data = {
      name,
      description,
      private: (visibility === 'private')
    };

    const status = new Spinner('Creating remote repository...');
    status.start();

    try {
      const response = await github.repos.createForAuthenticatedUser(data);

      return response.data.clone_url;
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  },

  createGitignore: async () => {
    // Search for all files without '.git' and '.gitignore'
    const filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');

    if (filelist.length) {
      const answers = await inquirer.askIgnoreFiles(filelist);

      if (answers.ignore.length) {
        fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
      } else {
        touch('.gitignore');
      }
    } else {
      touch('.gitignore');
    }
  },

  setupRepo: async (url) => {
    const status = new Spinner('Initializing local repository and pushing to remote...');
    status.start();

    try {
      await git.silent(true)
        .init()
        .add('.gitignore')
        .add('./*')
        .commit('Initial commit')
        .addRemote('origin', url)
        .push('origin', 'master');

      return true;
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  }
}