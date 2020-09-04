'use strict'

const chai = require('chai')
const app = require('../src')

describe('Pino Logger Library is OK?', () => {
    it('Load library is OK?', done => {
        chai.assert.isOk(!!app.logger, 'Logger is null')

        if (process.env.DEBUG) {
            app.logger({ level: 'trace' }).trace('TEST LOG TRACE!')
            app.logger({ level: 'debug' }).debug('TEST LOG DEBUG!')
            app.logger({ level: 'info' }).info('TEST LOG INFO!')
            app.logger({ level: 'warn' }).warn('TEST LOG WARN!')
            app.logger({ level: 'error' }).error('TEST LOG ERROR!')
            app.logger({ level: 'fatal' }).fatal('TEST LOG FATAL!')
        }

        app.logger({ level: 'fatal' }).info('IGNORED - If not is ERROR!')
        app.logger().debug('IGNORED - If not is ERROR!')

        done()
    })
})
