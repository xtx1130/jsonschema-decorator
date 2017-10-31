'use strict';
/*
 *@description 文件夹递归遍历
 *@return {Array} 此文件夹下所有js文件的绝对路径
 */
const fs = require('fs');
const path = require('path');

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
			if(stat.isDirectory()){
				readFile(_memoryPath+'/');
			}
		}
	})
}
readFile();
exports = module.exports = str;