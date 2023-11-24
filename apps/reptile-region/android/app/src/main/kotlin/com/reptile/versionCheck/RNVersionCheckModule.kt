package com.reptile.versionCheck

import android.content.pm.PackageManager
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class RNVersionCheckModule(private val reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName() = REACT_CLASS

    override fun getConstants(): MutableMap<String, Any>? {
        val packageManager = reactContext.packageManager
        val packageName = reactContext.packageName

        try {
            var currentVersion = "null"
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                currentVersion = packageManager.getPackageInfo(packageName, PackageManager.PackageInfoFlags.of(0)).versionName
            } else {
                @Suppress("DEPRECATION")
                currentVersion = packageManager.getPackageInfo(packageName, 0).versionName
            }

            return hashMapOf(
                    "currentVersion" to currentVersion
            )
        } catch (e: PackageManager.NameNotFoundException) {
            return hashMapOf(
                    "currentVersion" to "null"
            )
        }

        return super.getConstants()
    }

    companion object {
        const val REACT_CLASS = "RNVersionCheck"
    }
}