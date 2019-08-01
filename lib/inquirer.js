/**
 * Command-Line user interaction
 */

const inquirer = require('inquirer'); // Interative command-line
const files = require('./files');

module.exports = {
  askGithubCredentials: () => {
    // Define our questions
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your Github username or e-mail address:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];

    // Ask to user our questions
    return inquirer.prompt(questions);
  },

  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));  // Get the command-line arguments

    // Set questions
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Optionally enter a description of the repository:'
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private:',
        choices: ['public', 'private'],
        default: 'public'
      }
    ];

    return inquirer.prompt(questions);
  },

  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: 'Select the files and/or folders you widh to ignore:',
        choices: filelist,
        default: ['node_modules']
      }
    ];

    return inquirer.prompt(questions);
  }
}
