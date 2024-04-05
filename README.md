# font-query

font-query is a Node.js package for querying the fonts available on your system and returning their names and paths.


[![Socket Badge](https://socket.dev/api/badge/npm/package/font-query)](https://socket.dev/npm/package/font-query)
[![NPM Version](https://img.shields.io/npm/v/font-query.svg)](https://www.npmjs.com/package/font-query)
[![NPM Install Size](https://packagephobia.com/badge?p=font-query)](https://packagephobia.com/result?p=font-query)
[![NPM Downloads](https://img.shields.io/npm/dt/font-query.svg)](https://www.npmjs.com/package/font-query)
[![License](https://img.shields.io/github/license/salsan/font-query.svg)](https://opensource.org/licenses/MIT)


Current version support **Windows** and **Linux**

## Install

```bash
npm install font-query
```

Alternatively, if you wish to use font-query as a command-line tool:

```bash
npm install -g font-query
```


## Usage
### **Synchronous**
```js
const {fontQuery} = require('font-query');

let myFont = fontQuery('Bal');

console.log(myFont);
```
### **Asynchronous**
```js
const {fontQueryAsync} = require('font-query');

let myFont = fontQueryAsync('Bal');

myFont.then(fonts => {
   console.log(fonts)
  })
  .catch(err => {
   console.log(err)
 })


```
The return value of fonts is an array with the name and relative path of the query request

```bash
  [
      [
        'Baloo (TrueType)',
        'C:\\Users\\omen\\AppData\\Local\\Microsoft\\Windows\\Fonts\\Baloo-Regular.ttf'
      ]
  ]
```
# License

MIT License - Copyright 2021 Salvatore Santagati (<mailto:me@salsan.dev>)