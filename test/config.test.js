'use strict'

const chai = require('chai')
const app = require('../src')

describe('Convict library - Config Encapsulates', () => {
    it('Config loading defaultConfigDir unknown', done => {
        const backup = process.env.NODE_ENV

        try {
            app.config({}, 'unknown')
            done('Should be throws an error!')
        } catch (e) {
            chai.assert.equal('ENOENT', e.code)
            done()
        } finally {
            process.env.NODE_ENV = backup
        }
    })

    it('Config loading NODE_ENV unknown', done => {
        const backup = process.env.NODE_ENV

        try {
            process.env.NODE_ENV = 'unknown'
            app.config()
            done('Should be throws an error!')
        } catch (e) {
            chai.assert.equal('ENOENT', e.code)
            done()
        } finally {
            process.env.NODE_ENV = backup
        }
    })

    it('Config loading is OK?', done => {
        const test1 = {
            doc: 'Testando Doc 1',
            format: String,
            default: 'test1_def',
            env: 'TEST_1_ENV',
            arg: 'test_1_arg',
        }
        const test2 = {
            test1: {
                doc: 'Testando Doc 1 de 2',
                format: String,
                default: 'test1_de_2_def',
                env: 'TEST_1_DE_2_ENV',
                arg: 'test_1_de_2_arg',
            },
        }

        const config = app.config({ test1, test2 })

        chai.assert.isOk(!!config, 'Convict Config object is null!')
        chai.assert.isOk(config.has('test1'), 'Config.test1 not found!')

        chai.assert.isOk(config.has('test2.test1'), 'Config test2.test1 not found!')
        chai.assert.equal('test1_def', config.get('test1'), 'Config.test1 not equals!')
        chai.assert.equal(
            'test1_de_2_def',
            config.get('test2').test1,
            'Config.test2.test1 not equals!'
        )
        done()
    })
})
