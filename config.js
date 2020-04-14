const path = require('path');
const fs = require('fs');
const PROJECT_PATH = process.cwd();

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(PROJECT_PATH, './package.json'), 'utf-8')
);
const {
  name,
  ENTRY,
  DEV_HOST = '0.0.0.0',
  DEV_PORT = '3001',
  SOURCE_DIR = 'rsrc/src',
  TARGET_DIR = 'src/main/webapp',
  PUBLIC_PATH = `/${name.toLowerCase()}/rsrc/dist/`,
  CSS_MODULES = false,
} = pkg;

module.exports = {
  NAME: name.toLowerCase(),
  ENTRY,
  DEV_HOST,
  DEV_PORT,
  PROJECT_PATH,
  SOURCE_DIR,
  TARGET_DIR,
  PUBLIC_PATH,
  CSS_MODULES,
};
