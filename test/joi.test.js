'use strict'

const app = require('../src')

describe('Joi Library - Object Utilities', () => {
    it('Load library is OK?', done => {
        const Joi = app.objects.joi
        const memberSchema = Joi.object().keys({
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            birthyear: Joi.number().integer().min(1900).max(2013),
            email: Joi.string().email(),
        })

        try {
            const newMember = { email: 'lala' }
            Joi.assert(newMember, memberSchema)
            done('Joi assert not found errors!')
        } catch (e) {
            app.debug.here(`OK: Joi errors=${app.objects.inspect(e)}`)
            done()
        }
    })
})
