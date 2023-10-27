package com.reptile.versionCheck

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

import java.util.Collections

class RNVersionCheckPackage: ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext):  MutableList<NativeModule> {
        return mutableListOf(RNVersionCheckModule(reactContext)).toMutableList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return Collections.emptyList()
    }
}