package com.reptile.googleAuth

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.google.android.gms.auth.api.identity.SignInCredential


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
}