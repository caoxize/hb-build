const path = require('path');
const glob = require('glob');

const merge = require('webpack-merge');

const { ENTRY, PROJECT_PATH, SOURCE_DIR } = require('./config');

const setEntry = () => {
  if (ENTRY) {
    return {
      entry: ENTRY,
    };
  }

  const entry = {};
  const entryFiles = glob
    .sync(path.join(PROJECT_PATH, SOURCE_DIR, 'page', '*/index.js'))
    .concat(
      glob.sync(path.join(PROJECT_PATH, SOURCE_DIR, 'page', '*/index.jsx'))
    );

  entryFiles.forEach((entryFile) => {
    const regexp = new RegExp(`${SOURCE_DIR}/page/(.*)/index.(js|jsx)`);
    const match = entryFile.match(regexp);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
  });

  return {
    entry,
  };
};

const { entry } = setEntry();

module.exports = {
  entry,
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [path.resolve(__dirname, SOURCE_DIR), 'node_modules'],
  },
};
