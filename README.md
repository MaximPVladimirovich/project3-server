<!--
*** Thanks for checking out my project. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or open an issue with the tag "enhancement".
*** Thanks again! 
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->

  <h3 align="center">Future Finance</h3>

  <p align="center">
    A simple expense tracker that runs in your browser!
    <br />
    <a href="https://github.com/MaximPVladimirovich/Expenses-full"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ancient-cove-27847.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/MaximPVladimirovich/Expenses-full/issues">Report Bug</a>
    ·
    <a href="https://github.com/MaximPVladimirovich/Expenses-full/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
   
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
   
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

The goal of this app is to provide a simple way for anyone to keep track of their expenses. You can create expenses and edit basic information about your current spending habits. 


A list of used resources that I found helpful are listed in the acknowledgements.

### Built With


* [Webpack](https://webpack.js.org/)
* [Node.js](https://nodejs.org/en/)
* [React](https://reactjs.org/)



<!-- GETTING STARTED -->
## Getting Started

If you would like to use this project feel free to download or follow the instructions below.

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
* Install Node.js


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/MaximPVladimirovich/Expenses-full.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your ENV variables in `.env`
   ```JS
   const MONGODB_URI = 'ENTER YOUR URL';
   const JWT_SECRET = 'ENTER STRING'
   ```

## Deploying
Webpack bundles all your code into a dynamic folder for easy deployement.</p>
Configure for development and production<br/>
1. Configure .babelrc
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```
2. Configure webpack<br/>
- webpack.config.client.js
```
const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
  name: "browser",
  // Sets process.env.NODE.ENV to value. Defaults to production.
  mode: "development",
  // Specifies how source maps are generated.
  // Source maps are a way of mapping code from a compressed file.
  devtool: 'eval-source-map',
  // Specifies where webpack starts bundling code.
  entry: [
    'webpack-hot-middleware/client?reload=true', path.join(CURRENT_WORKING_DIR, 'client/main.js')
  ],
  // The output path for the bundled code
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    // All public assest in app
    publicPath: '/dist/'
  },
  // Sets regex rule for which file is used in transpilation. 
  module: {
    rules: [
      {
        test: /\jsx?$/,
        exclude: /node_modules/,
        // This is the transpilation tool
        use: ['babel-loader']
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

module.exports = config
```
- webpack.config.client.production.js 
```
const path = require('path')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
  mode: "production",
  entry: [
    path.join(CURRENT_WORKING_DIR, 'client/main.js')
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  }
}

module.exports = config
```
- webpack.config.server.js 
```
const path = require('path')
const CURRENT_WORKING_DIR = process.cwd()
const nodeExternals = require('webpack-node-externals')

const config = {
  name: "server",
  entry: [path.join(CURRENT_WORKING_DIR, './server/server.js')],
  target: "node",
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/'),
    filename: "server.generated.js",
    publicPath: '/dist/',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  }
}
module.exports = config
```
3. Add scripts to package.json
```"scripts": {
    "development": "nodemon",
    "build": "webpack --config webpack.config.client.production.js && webpack --mode=production --config webpack.config.server.js",
    "start": "NODE_ENV=production node ./dist/server.generated.js"
  }
  ```
  4.Run npm script
   ```sh
   npm run build
   ```
   
   5. From here you can continue creating a heroku app like normal and you should be good to go. remember env variables. 




<!-- USAGE EXAMPLES -->
## Usage


[![Product Name Screen Shot][usage-screenshot1]]
[![Product Name Screen Shot][usage-screenshot2]]






<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/MaximPVladimirovich/Expenses-full/issues) for a list of proposed features (and known issues).





<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

James Maxim Bleeker - maxim.bleeker@gmail.com

Project Link: [https://github.com/MaximPVladimirovich/Expenses-full/issues](https://github.com/MaximPVladimirovich/Expenses-full)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[usage-screenshot1]: client/assets/images/addexpense.png
[usage-screenshot2]: client/assets/images/seeexpenses.png
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/james-maxim-vladimirovich/
[product-screenshot]: client/assets/images/ffimg.png
