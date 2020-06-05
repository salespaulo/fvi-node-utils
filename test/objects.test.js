'use strict'

const chai = require('chai')
const util = require('util')

const { inspect, toConfig, isConfig, throwsIfNotConfig } = require('../app/objects')

describe(`Objects Utils - require('i-node-utils/app/object'):`, () => {
    describe('Testing method inspect(obj: Object)', () => {
        it('inspect - OK', done => {
            chai.assert(inspect({ test: 'testIt' }) === util.inspect({ test: 'testIt' }))
            done()
        })
    })

    describe('Testing method toConfig(obj: Object)', () => {
        it('toConfig is OK?', done => {
            const name = 'koa-test-server'
            const version = '1.0'
            const port = 9990
            const props = {
                server: {
                    name,
                    version,
                    port,
                },
            }
            const config = toConfig(props)

            throwsIfNotConfig(config)

            chai.assert.exists(config.get('server'), 'Server is null!')
            chai.assert.exists(config.get('server.name'), 'Server name is null!')
            chai.assert.exists(config.get('server.version'), 'Server version is null!')
            chai.assert.exists(config.get('server.port'), 'Server port is null!')
            chai.assert.equal(name, config.get('server.name'), 'Server name is invalid!')
            chai.assert.equal(version, config.get('server.version'), 'Server version is invalid!')
            chai.assert.equal(port, config.get('server.port'), 'Server port is invalid!')
            done()
        })
    })

    describe('Testing method isConfig(config: Object)', () => {
        it('isConfig Object is OK?', done => {
            const expected = true
            const result = isConfig({
                get: s => s,
                has: s => !!s,
                getProperties: () => {},
            })
            chai.should().equal(expected, result, `expected=${expected}, result=${result}`)
            done()
        })

        it('isConfig Object is Not OK?', done => {
            const expected = false
            const result = isConfig({
                get: s => s,
                has: s => !!s,
            })
            chai.should().equal(expected, result, `expected=${expected}, result=${result}`)
            done()
        })
    })

    describe('Testing method throwsIfNotConfig(config: Object)', () => {
        it('throwsIfNotConfig is OK?', done => {
            try {
                throwsIfNotConfig({
                    get: s => s,
                    has: s => !!s,
                    getProperties: () => {},
                })

                done()
            } catch (e) {
                done(e)
            }
        })

        it('throwsIfNotConfig is Not OK?', done => {
            try {
                throwsIfNotConfig({
                    get: s => s,
                    has: s => !!s,
                })
                done('Not throws exception!')
            } catch (e) {
                chai.should().equal(
                    'InvalidConfigError',
                    e.name,
                    'Throw Error is not Invalid Config.'
                )
                done()
            }
        })
    })
})
