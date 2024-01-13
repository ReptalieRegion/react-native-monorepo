
package com.reptileregionreactnativ

import android.app.Application
import android.content.res.Configuration
import androidx.annotation.NonNull

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.config.ReactFeatureFlags
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

import com.reptile.googleAuth.RNGoogleAuthPackage
import com.reptile.kakaoauth.RNKakaoAuthPackage
import com.reptile.versionCheck.RNVersionCheckPackage

import java.util.ArrayList

class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost =
          object : DefaultReactNativeHost(this) {
//            override fun getPackages(): List<ReactPackage> =
//                    PackageList(this).packages.apply  {
//                      add(RNKakaoAuthPackage())
//                      add(RNGoogleAuthPackage())
//                      add(RNVersionCheckPackage())
//            }
              override fun getPackages(): ArrayList<ReactPackage> =
                  PackageList(this).packages.apply {
                      // Packages that cannot be autolinked yet can be added manually here, for example:
                      // packages.add(new MyReactNativePackage());
                      add(RNKakaoAuthPackage())
                      add(RNGoogleAuthPackage())
                      add(RNVersionCheckPackage())
                  }



              override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
          }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}
