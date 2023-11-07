const path = require('path');

const Routes = {
  root: path.dirname(__dirname),
  source: `${path.dirname(__dirname)}/src`,
  tempFile: `${path.dirname(__dirname)}/src/checkLastEntry.json`,
  clippingFile: path.join(path.dirname(__dirname), 'data', 'My Clippings.txt')
};

module.exports = Routes;
