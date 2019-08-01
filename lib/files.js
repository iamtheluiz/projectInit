/**
 *  File Management 
 **/

const fs = require('fs');   // File System
const path = require('path'); // Directory

module.exports = {
  getCurrentDirectoryBase: () => {
    let completePath = process.cwd();   // Get the complete folder path
    return path.basename(completePath); // Return the folder name
  },

  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory(); // Verify if this folder exists
    } catch (err) {
      return false;
    }
  }
}