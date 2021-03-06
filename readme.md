### jsonSchema-decorator

> a decorator for jsonSchema

[![Build Status](https://travis-ci.org/xtx1130/jsonschema-decorator.svg?branch=master)](https://travis-ci.org/xtx1130/jsonschema-decorator) [![Coverage Status](https://coveralls.io/repos/github/xtx1130/jsonschema-decorator/badge.svg?branch=master)](https://coveralls.io/github/xtx1130/jsonschema-decorator?branch=master)
#### Usage

Install code:
```js
npm install jsonschema-decorator
```
You need to establish a folder in your project root dir:
```shell
$/projectRootDir mkdir mock-decorators
chmod -R 777 mock-decorators
```
or you can use `package.json` to config a folder that jsonSchema will read:
```json
// package.json
{
    "jsonSchema": {
        "path": "The schema path you want"
    }
}
```

Then, you can create js schema roles in dirctory mock-decorator,eg:
```code
mock-decorator/----common/(write common rules in here)
                |
                |--schema.js(write unique rules in js files)
                |--folders/(you can also create more folders to save js files)
                   |
                   |--otherschema.js(other unique rules) 
```
There is and example for jsonschema-decorator:
```js
//schema.js
'use strict';
require('./common/person');//This is a common schema

exports = module.exports = {//This is the unique schema
    "id": "/jsontest",
    "type": "object",
    "properties": {
        "test": {
            "type": "boolean",
            "required": "true"
        },
        "name": {
            "type": "string",
            "required": "true"
        },
        "params": {
            "$ref": "/jsonTestParam"
        }
    }
}

//index.js
const jd = require('jsonschema-decorator');
@jd.jsontest
class jsonTest {
    constructor(){
        this.val = {
            test:true,
            name:'xtx',
            params:{
                sex:'male',
                age:25
            }
        }
    }
}
router.get('/jsontest',async (ctx,next) => {
    ctx.set('Content-Type','application/json');
    let jsonT = new jsonTest();//new Object in here
    let json = jsonT.getVal();//get the schema value,if passed on ,it will return the mock json,else it will return a json contains the mistake
    ctx.body = jsonp(json);//use the json
});
```
for more example,please see the [test case](https://github.com/xtx1130/jsonschema-decorator/blob/master/test/server.js)

#### LICENSE

MIT