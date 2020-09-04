'use strict'

const joi = require('@hapi/joi')
const convict = require('convict')
const stacktrace = require('stacktrace-js')

const util = require('util')

const debug = require('../debug')

const merge = (obj, toMerge) => Object.assign(obj, toMerge)

const json = obj => JSON.stringify(obj)

const inspect = obj => util.inspect(obj, false, null)

const toConfig = obj => {
    const config = convict({})

    try {
        config.load(obj)
        return config
    } catch (e) {
        throw toErrorStack(e, log => debug.here(`Invalid Config: error=${inspect(log)}`))
    }
}

const isConfig = obj => {
    const isObjLikeIConfig =
        obj &&
        obj.get &&
        typeof obj.get === 'function' &&
        obj.has &&
        typeof obj.has === 'function' &&
        obj.getProperties &&
        typeof obj.getProperties === 'function'

    return !!isObjLikeIConfig
}

const throwsIfNotConfig = obj => {
    const isObjLikeIConfig = isConfig(obj)

    if (!isObjLikeIConfig) {
        const e = new Error(
            `Invalid Config: Is null or Not implements { get()|has()|getProperties() }. Invalid obj=${inspect(
                obj
            )}`
        )
        e.name = 'InvalidConfigError'
        throw e
    }
}

const toJson = base64 => {
    if (!base64) return null

    try {
        const buffer = new Buffer(base64, 'base64')
        const utf8 = buffer.toString('utf8')

        return JSON.parse(utf8)
    } catch (e) {
        throw e
    }
}

const toBase64 = json => {
    try {
        const stringify = JSON.stringify(json)
        const buffer = Buffer.from(stringify)

        return buffer.toString('base64')
    } catch (e) {
        throw e
    }
}

const toTrace = async (error = false) => {
    if (!error) {
        try {
            return await stacktrace.get()
        } catch (e) {
            return await stacktrace.fromError(e)
        }
    }

    if (error && error instanceof Error) {
        return await stacktrace.fromError(error)
    }

    const e = new Error(`Error toTrace invalid argument!`)
    e.name = 'ToTraceError'
    throw e
}

const toErrorStack = (error, cb = null) => {
    const newError = ({ code, type, message }) => {
        if (cb != null) {
            cb(`[${code}][${type}]: ${message}`)
        }

        const error = new Error()
        error.message = message
        error.code = code
        error.type = type
        return error
    }

    if (error == null) {
        const code = 520
        const type = 'null_error'
        const message = `Is Null!`
        return newError({ code, type, message })
    }

    if (error.response != null) {
        const eresponse = error.response
        const code = eresponse.status
        const type = 'http_response'
        const message = inspect(eresponse.data)

        return newError({ code, type, message })
    }

    if (error.request != null) {
        const code = 421 // 421 - Misdirected Request (RFC 7540)
        const type = 'http_request'
        const message = `Misdirected Request (RFC 7540) - Server Not Responding: Unavailable request=${inspect(error.request)}`

        return newError({ code, type, message })
    }

    if (error instanceof Error) {
        const code = 500
        const type = 'error'
        const message = `${inspect(error)}`

        return newError({ code, type, message })
    }

    const code = 520 // Unknown error
    const type = 'unknown_error'
    const message = `Unknown Error=${inspect(error)}`

    return newError({ code, type, message })
}

const toErrorTrace = async error => {
    const stackError = toErrorStack(error)
    let trace = null

    if (!stackError.error) {
        trace = await toTrace()
    } else {
        trace = await toTrace(error)
    }

    stackError.trace = trace
    return stackError
}

module.exports = {
    merge,
    json,
    inspect,
    toConfig,
    isConfig,
    throwsIfNotConfig,
    toJson,
    toBase64,
    toErrorStack,
    toErrorTrace,
    joi,
}
