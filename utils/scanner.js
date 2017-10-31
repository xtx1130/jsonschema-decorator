'use strict';
/*
 *@description 文件夹递归遍历
 *@return {Array} 此文件夹下所有js文件的绝对路径
 */
const fs = require('fs');
const path = require('path');

/* istanbul ignore next */
let filePath = process.env.NODE_ENV == 'travis' ? '/test/mock-decorators/' : '/mock-decorators/';
/* istanbul ignore next */
let projectPath = process.env.NODE_ENV == 'travis' ? path.join(__dirname,'../') : process.cwd();
let truePath = path.join(projectPath + filePath);
let str = [];
let _memoryPath = '';

let readFile = (directory) => {
	directory = directory || truePath;
	let readlist = fs.readdirSync(directory);
	readlist.forEach(s=>{
		if(s.match('.js'))
			str.push(directory+s);
		else if(s.split('.').length === 1 && !s.match('common')){
			_memoryPath = path.join(directory,s);
			let stat = fs.lstatSync(_memoryPath);
			/* istanbul ignore else */
			if(stat.isDirectory()){
				readFile(_memoryPath+'/');
			}
		}
	})
}
readFile();
exports = module.exports = str;