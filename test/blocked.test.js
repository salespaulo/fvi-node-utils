'use strict'

const chai = require('chai')
const app = require('../app')

describe('Blocked library', () => {
    it('is OK?', done => {
        chai.assert.ok(app.blocked, 'Blocked library not load!')
        const timer = app.blocked(ms => {
            done('Event Loop not blocked, not show this!')
        })
        clearInterval(timer)
        done()
    })
})
