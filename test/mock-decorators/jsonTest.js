'use strict';
require('./common/person');

exports = module.exports = {
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