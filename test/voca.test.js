'use strict'

const chai = require('chai')
const app = require('../app')

describe('Voca Library - String Utilities', () => {
    it('Load library is OK?', done => {
        const v = app.string
        chai.assert.equal(v.camelCase('bird flight'), 'birdFlight')
        chai.assert.equal(v.sprintf('%s costs $%.2f', 'Tea', 1.5), 'Tea costs $1.50')
        chai.assert.equal(v.slugify('What a wonderful world'), 'what-a-wonderful-world')
        done()
    })
})
