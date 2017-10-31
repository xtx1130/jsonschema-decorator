'use strict';

const Validator = require('jsonschema').Validator;
const scanner = require('./utils/scanner');
const subStr = require('./utils/takeOffSymbol');
const path = require('path');

/* istanbul ignore next */
let filePath = process.env.NODE_ENV == 'travis' ? '/test/mock-decorators/' : '/mock-decorators/';
/* istanbul ignore next */
let projectPath = process.env.NODE_ENV == 'travis' ? __dirname : process.cwd();
let privateDec = Symbol.for('symbol#decorators');
global.v = new Validator();

privateDec = {};
for(let i = 0; i<scanner.length;i++){
	let valiInstance = require(scanner[i]);
	privateDec[subStr(valiInstance.id)] = valiInstance;
}
let uriJsonSchema = () => {
	let keys = Object.keys(privateDec);
	for(let i = 0; i< keys.length;i++){
		module.exports[keys[i]] = function (target) {
			target.prototype.decorator = function() {
				return v.validate(this.val,privateDec[keys[i]]);
			}
			target.prototype.getVal = function() {
				let testCase = this.decorator();
				if(testCase.valid){
					return this.val;
				}else{
					return {
						'err': 'This json can not pass jsonSchema test,please check again',
						'schemaId': `${testCase.schema.id}`
					}
				}
			}
		}
	}
}
uriJsonSchema();