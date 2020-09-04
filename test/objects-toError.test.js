'use strict'

const chai = require('chai')
const util = require('util')

const { inspect, toErrorStack, toErrorTrace } = require('../src/objects')

const testReturns = (returns, code, type, msg) => {
    chai.assert.exists(returns, 'Error is null!')
    chai.assert.exists(returns.code, 'Error code is null!')
    chai.assert.exists(returns.type, 'Error type is null!')
    chai.assert.exists(returns.message, 'Error message is null!')
    chai.assert.exists(returns.stack, 'Error stack is null!')
    chai.assert.equal(code, returns.code, `Error code is not ${code}!`)
    chai.assert.equal(type, returns.type, `Error type is not ${type}!`)
    chai.assert.equal(msg, returns.message, `Error message is not ${msg}!`)
}

describe(`Objects Utils - require('fvi-node-utils/app/object') - toErrorStack and toErrorTrace:`, () => {
    describe('Testing toErrorStack(error: Error)', () => {
        it('Testing { } toError - OK', done => {
            try {
                const returns = toErrorStack({})
                testReturns(returns, 520, 'unknown_error', `Unknown Error=${inspect({})}`)
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing { unknown: "unknown" } toError - OK', done => {
            try {
                const input = { unknown: 'unknown' }
                const returns = toErrorStack(input)
                testReturns(returns, 520, 'unknown_error', `Unknown Error=${inspect(input)}`)
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing { status: 200, unknown: "unknown" } toError - OK', done => {
            try {
                const input = { status: 200, unknown: 'unknown' }
                const returns = toErrorStack(input)
                testReturns(returns, 520, 'unknown_error', `Unknown Error=${inspect(input)}`)
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing { status: 500, unknown: "unknown" } toError - OK', done => {
            try {
                const input = { status: 500, unknown: 'unknown' }
                const returns = toErrorStack(input)
                testReturns(returns, 520, 'unknown_error', `Unknown Error=${inspect(input)}`)
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing { status: 400, unknown: "unknown" } toError - OK', done => {
            try {
                const input = { status: 400, unknown: 'unknown' }
                const returns = toErrorStack(input)
                testReturns(returns, 520, 'unknown_error', `Unknown Error=${inspect(input)}`)
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing new Error() toError OK', done => {
            try {
                const msg = `ERROR Testing toError!`
                const error = new Error(msg)
                const returns = toErrorStack(error)
                testReturns(returns, 500, 'error', inspect(error))
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing http_response - OK', done => {
            try {
                const message = `Response Error!`
                const data = { message }
                const error = {
                    response: {
                        status: 404,
                        data,
                    },
                }
                const returns = toErrorStack(error)
                testReturns(returns, 404, 'http_response', util.inspect(data))
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing null error - OK', done => {
            try {
                const returns = toErrorStack(null)
                testReturns(returns, 520, 'null_error', 'Is Null!')
                done()
            } catch (e) {
                done(e)
            }
        })

        it('Testing with callback function - OK', done => {
            const msg = 'Testing callback function'
            toErrorStack(new Error(msg), log => {
                try {
                    chai.assert.exists(log, `log not exists!`)
                    done()
                } catch (e) {
                    done(e)
                }
            })
        })
    })

    describe('Testing async toErrorTrace(error: Error)', () => {
        it('Testing new Error() toError OK', done => {
            const msg = `ERROR Testing toError!`
            const error = new Error(msg)
            toErrorTrace(error)
                .then(returns => {
                    testReturns(returns, 500, 'error', inspect(error))

                    done()
                })
                .catch(done)
        })

        it('Testing http_response - OK', done => {
            const message = `Response Error!`
            const data = { message }
            const error = {
                response: {
                    status: 404,
                    data,
                },
            }
            toErrorTrace(error)
                .then(returns => {
                    testReturns(returns, 404, 'http_response', util.inspect(data))
                    done()
                })
                .catch(done)
        })

        it('Testing null error - OK', done => {
            toErrorTrace(null)
                .then(returns => {
                    testReturns(returns, 520, 'null_error', 'Is Null!')
                    done()
                })
                .catch(done)
        })
    })
})
