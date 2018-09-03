'use strict'

exports = module.exports = (str) => typeof str === 'string' && str.startsWith('/') ? str.split('/')[1] : str
