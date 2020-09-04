'use strict'

const dotenv = require('dotenv-safe')
const sugar = require('sugar')
const blocked = require('blocked')

const env = require('./env')
const debug = require('./debug')
const config = require('./config')
const logger = require('./logger')
const string = require('./string')
const arrays = require('./arrays')
const objects = require('./objects')

if (env.IS_PROD) {
    process.on('unhandledRejection', (reason, p) => {
        // I just caught an unhandled promise rejection,
        // since we already have fallback handler for unhandled errors (see below),
        // let throw and let him handle that
        debug.here(`unhandledRejection:reason:${objects.inspect(reason)}`)
        throw reason
    })
    process.on('uncaughtException', error => {
        // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
        objects.toErrorTrace(error).then(errorEnhanced => {
            console.error(errorEnhanced)
            debug.here(`uncaughtException:error:${objects.inspect(errorEnhanced)}`)
        })
    })

    process.on('SIGINT', p => {
        debug.here(`SIGINT: Process finish with ${inpect(p)}`)
    })

    process.on('SIGTERM', () => {
        debug.here(`SIGTERM: Process finish with ^C`)
    })
}

dotenv.config({
    allowEmptyValues: true,
})

module.exports = {
    env,
    sugar,
    debug,
    logger,
    string,
    config,
    arrays,
    objects,
    blocked,
}
