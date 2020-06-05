'use strict'

const chai = require('chai')
const app = require('../app')

describe('Sugar Library', () => {
    it('Array.unique()', done => {
        const input = [1, 2, 2, 3, 3, 3]
        const unique = app.sugar.Array(input).unique().raw

        chai.assert.equal(unique.length, 3)
        chai.assert.equal(unique[0], 1)
        chai.assert.equal(unique[1], 2)
        chai.assert.equal(unique[2], 3)

        done()
    })
})
