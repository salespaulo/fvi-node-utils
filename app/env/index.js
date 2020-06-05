'use strict'

const IS_ENV = envName => process.env.NODE_ENV === envName

const envs = {
    DEVELOPMENT: 'development',
    LOCALHOST: 'localhost',
    STAGING: 'staging',
    TEST: 'test',
    PRODUCTION: 'production',
}

module.exports = {
    ...envs,
    IS_ENV,
    IS_DEV: IS_ENV(envs.DEVELOPMENT),
    IS_TEST: IS_ENV(envs.TEST),
    IS_LOCAL: IS_ENV(envs.LOCALHOST),
    IS_STAG: IS_ENV(envs.STAGING),
    IS_PROD: IS_ENV(envs.PRODUCTION),
}
