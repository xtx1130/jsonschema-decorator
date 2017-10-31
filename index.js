'use strict';

global.filePath = process.env.NODE_ENV == 'travis' ? '/test/mock-decorators/' : '/mock-decorators/';
global.projectPath = __dirname;

const Validator = require('jsonschema').Validator;
const scanner = require('./utils/scanner');
const subStr = require('./utils/takeOffSymbol');
const path = require('path');

let privateDec = Symbol.for('decorators');
global.v = new  Validator();

privateDec = {};
for(let i = 0; i<scanner.length;i++){
	try {
		let valiInstance = require(scanner[i]);
		privateDec[subStr(valiInstance.id)] = valiInstance;
	} catch (e) {
		throw new Error(e);
	}
}
function uriJsonSchema () {
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