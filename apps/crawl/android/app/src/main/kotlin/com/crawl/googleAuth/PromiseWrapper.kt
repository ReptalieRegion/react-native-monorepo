package com.crawl.googleAuth

import com.facebook.react.bridge.Promise


class PromiseWrapper {
    private var promise: Promise? = null

    fun setPromise(newPromise: Promise) {
        promise?.reject("ASYNC_OP_IN_PROGRESS", "")
        promise = newPromise
    }
    fun resolve(value: Any?) {
        val currentPromise = promise ?: return
        reset()
        currentPromise.resolve(value)
    }

    fun reject(code: String?, throwable: String) {
        val currentPromise = promise ?: return
        reset()
        currentPromise.reject(code, throwable)
    }

    private fun reset() {
        promise = null
    }
}