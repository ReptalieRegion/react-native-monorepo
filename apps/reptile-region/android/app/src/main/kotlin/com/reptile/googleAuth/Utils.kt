package com.reptile.googleAuth

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.google.android.gms.auth.api.identity.SignInCredential
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.CommonStatusCodes
import com.google.android.gms.tasks.Task
import java.lang.Exception


class Utils {
    fun getUserProperties(signInCredential: SignInCredential): WritableMap? {
        val photoUrl = signInCredential.profilePictureUri
        val user: WritableMap = Arguments.createMap()
        user.putString("id", signInCredential.id)
        user.putString("name", signInCredential.displayName)
        user.putString("givenName", signInCredential.givenName)
        user.putString("familyName", signInCredential.familyName)
        user.putString("password", signInCredential.password)
        user.putString("photo", photoUrl?.toString())
        val params: WritableMap = Arguments.createMap()
        params.putMap("user", user)
        params.putString("idToken", signInCredential.googleIdToken)
       return params
    }

    fun getExceptionCode(task: Task<Void>): Int {
        val e: Exception? = task.exception
        if (e is ApiException) {
            return e.statusCode
        }
        return CommonStatusCodes.INTERNAL_ERROR
    }
}