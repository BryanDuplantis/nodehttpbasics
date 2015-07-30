var chalk = require('chalk');
var port = process.env.PORT || 1337;
require('./lib/server')(port);

// console.log(chalk.blue('Testing Testing 123'));

console.log('Server running on ' +
  chalk.red.bold.underline('http://localhost:' + port));

