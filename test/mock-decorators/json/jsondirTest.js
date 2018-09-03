'use strict'

require('../common/person')

exports = module.exports = {
  'id': 'jsondirtest',
  'type': 'object',
  'properties': {
    'dir': {
      'type': 'boolean',
      'required': 'true'
    },
    'dirname': {
      'type': 'string',
      'required': 'true'
    },
    'params': {
      '$ref': '/jsonTestParam'
    }
  }
}
