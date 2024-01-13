package com.reptile.googleAuth

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.Collections


class RNGoogleAuthPackage: ReactPackage {
    override fun createNativeModules(
            reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(RNGoogleAuthModule(reactContext)).toMutableList()


    override fun createViewManagers(
            reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()
}