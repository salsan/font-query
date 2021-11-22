# font-query

font-query is a Node.js package for query the fonts available on your system.

Current version support **Windows** and **Linux**

## Install

```bash
npm install font-query
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
The return value of  `fonts` is an Array with name and relative path of query request

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
