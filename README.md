# Project Init

An application (CLI) to help developers create new projects, automatizing some tasks, as creating a remote repository and committing initial files.

## Getting Started

To use this project, you will need [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) into your machine.

### Installing

Get the source code cloning this repository:

```
git clone https://github.com/iamtheluiz/projectInit.git
```

Access the generated folder:

```
cd projectInit
```

Install all project dependencies:

```
npm install 
```

### Running

To run this project, you can use:

```
node index.js
```

But, this project is a CLI, and we have to install it globally. To do this, we can run:

```
npm link
```

It will allow you to use the following command into any folder:

```
pinit
```

### How to Use

First, you need to create a folder for your project and get inside of it:

```
iamtheluiz@iamtheluiz ~/workspace
$ mkdir myProject

iamtheluiz@iamtheluiz ~/workspace
$ cd myProject
```

Next step is run the cli:

```
iamtheluiz@iamtheluiz ~/workspace/myProject
$ pinit
```

When you execute the cli, it will ask to your github username/e-mail and password (it will be used to generate a token to access github functions). After set your github account, it will ask for a Project Name, a Description and the repository privacity (to create a github repository), sending the first commit of the project.

## References

- [Build a JavaScript Command Line Interface (CLI) with Node.js](https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/)