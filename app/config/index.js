'use strict'

const path = require('path')
const convict = require('convict')

const debug = require('../debug').here
const { toErrorStack } = require('../objects')

const REQUIRED_SCHEMA = {
    env: {
        doc: 'The application environment.',
        format: ['production', 'staging', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
}

const DEFAULT_CFGDIR = path.resolve('./config')
const VALIDATE_OPTS = { allowed: { output: null } }

module.exports = (schema, logDir = DEFAULT_CFGDIR) => {
    const config = convict({ ...schema, ...REQUIRED_SCHEMA })

    try {
        const configFiles = process.env.CONFIG_FILES || ''
        config.loadFile(configFiles.split(','))
    } catch (e) {
        //return is ignored
        toErrorStack(e, log => debug(`process.env.CONFIG_FILES NOT FOUND: ${log}`))

        const env = config.get('env')
        const defaultLogDir = `${logDir}/${env}.json`

        config.loadFile(defaultLogDir)
    }

    config.validate(VALIDATE_OPTS)
    return config
}
