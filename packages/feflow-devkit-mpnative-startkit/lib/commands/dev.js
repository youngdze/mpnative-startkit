const path = require('path');
const myExecSync = require('../myExecSync');

module.exports = (ctx) => {
  const projectPath = ctx.projectPath;
  const gulpfile = path.resolve(__dirname, '../gulpfile.js');
  myExecSync(`npx gulp dev --color --gulpfile ${gulpfile}`, {
    GULP_BASE_PATH: projectPath,
  });
};
