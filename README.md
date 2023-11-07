# Kindle to Markdown

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

Convert your kindle Highlight into Markdown Notes from the Clipping.txt file.

## Installation 🚀

A basic installation is required.
Just clone or Fork the repo and install the dependencies.

```bash
  git clone https://github.com/sancg/kindle-to-notes.git
  cd kindle-to-notes
  npm install
```

Now, it comes with the good part ✨

## Usage/Examples

All you need is to copy and past the `My Clipping.txt` file into the `./data` folder of the project.
You can config the route of the Clipping file on `./utils/Routes.js`

```js
const path = require('path');

const Routes = {
  root: path.dirname(__dirname),
  source: `${path.dirname(__dirname)}/src`,
  tempFile: `${path.dirname(__dirname)}/src/checkLastEntry.json`,
  clippingFile: path.join(path.dirname(__dirname), 'data', 'My Clippings.txt') // Add your Own clipping Route
};

module.exports = Routes;
```

After that run the command.

```bash
npm start
```

## Documentation

TODO: adding further documentation 🌱

- [Documentation](https://linktodocumentation)
