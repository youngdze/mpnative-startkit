const execSync = require('child_process').execSync;

module.exports = (command = '', env = {}) => {
  execSync(command, {
    env: Object.assign({ PATH: process.env.PATH }, env),
    stdio: 'inherit',
  });
};
