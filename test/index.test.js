'use strict'

const chai = require('chai')

const app = require('../src')

describe('Testing index:', () => {
    describe('Testing env', () => {
        it('Testing env.IS_TEST - OK:', done => {
            chai.assert.isBoolean(app.env.IS_TEST)
            done()
        })

        it('Testing env.IS_DEV - OK:', done => {
            chai.assert.isBoolean(app.env.IS_DEV)
            done()
        })
        it('Testing env.IS_STAG- OK:', done => {
            chai.assert.isBoolean(app.env.IS_STAG)
            chai.assert.isFalse(app.env.IS_STAG)
            done()
        })
        it('Testing env.IS_PROD- OK:', done => {
            chai.assert.isBoolean(app.env.IS_PROD)
            chai.assert.isFalse(app.env.IS_PROD)
            done()
        })
    })

    describe('Testing Arrays', () => {
        it('Testing Arrays chunk OK', done => {
            const d = app.arrays.chunk([1, 2, 3, 4, 5, 6, 7], 2)
            chai.assert.sameDeepMembers(d, [[1, 2], [3, 4], [5, 6], [7]])
            done()
        })
    })
})
