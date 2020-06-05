'use strict'

const debug = require('debug')
const path = require('path')

/*
module.exports.default = debug('i-node-utils')
module.exports = debug
*/

const partial = namespace => msg => {
    debug(`${namespace}`)(`::debug:: ${msg}`)
}

const here = msg => {
    partial(path.basename(path.resolve()))(msg)
}

module.exports = partial
module.exports.here = here
