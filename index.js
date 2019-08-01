const chalk   = require('chalk');   // Color to output
const clear   = require('clear');   // Clears terminal
const figlet  = require('figlet');  // Generate a ASCII Banner

// Out libs
const files = require('./lib/files');

/* Application Start */

clear();  // Clear terminal

// Show Project Banner
console.log(
  chalk.yellow( // Yellow font color
    // Generate Project Banner
    figlet.textSync('ProjectInit', { horizontalLayout: 'full' })
  )
);