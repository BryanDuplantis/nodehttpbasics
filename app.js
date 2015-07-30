var chalk = require('chalk');

require('./lib/server')(1337);

// console.log(chalk.blue('Testing Testing 123'));

console.log('Server running on ' + chalk.red.bold.underline('http://localhost:1337'));

