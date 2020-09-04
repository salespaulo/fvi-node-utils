'use strict'

const chai = require('chai')
const app = require('../src')

describe('Collect.js library - Array Utilities', () => {
    it('Collect.avg is OK?', done => {
        const collect = app.arrays.collect
        chai.assert.equal(collect([1, 3, 3, 7]).avg(), 3.5)
        done()
    })
})
