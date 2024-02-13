const path = require('path');

const buildEslintCommand = (filenames) =>
  `yarn next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;
const formatCommand = 'yarn prettier . --write';
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.*': [formatCommand],
};
