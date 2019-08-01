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
        validate: function (value){
          if(value.length){
            return true;
          }else{
            return 'Please enter your password.';
          }
        }
      }
    ];

    // Ask to user our questions
    return inquirer.prompt(questions);
  }
}
