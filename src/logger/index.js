'use strict'

const pino = require('pino')

const env = require('../env')

const getLogger = () => {
    if (env.IS_DEV || env.IS_LOCAL || env.IS_TEST) {
        return pino({
            prettyPrint: {
                levelFirst: true,
            },
        })
    } else {
        return pino()
    }
}

const logger = getLogger()

module.exports = (cfg = { level: 'info' }) => {
    logger.level = cfg.level
    return logger
}
