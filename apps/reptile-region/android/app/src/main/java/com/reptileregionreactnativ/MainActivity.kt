package com.reptileregionreactnativ
import expo.modules.ReactActivityDelegateWrapper

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle

import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity: ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // Set the theme to AppTheme BEFORE onCreate to support
        // coloring the background, status bar, and navigation bar.
        // This is required for expo-splash-screen.
        setTheme(R.style.AppTheme);
        RNBootSplash.init(this, R.style.BootTheme)
        super.onCreate(null)
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "reptile-region"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
      override fun createReactActivityDelegate(): ReactActivityDelegate {
          return ReactActivityDelegateWrapper(
              this,
              BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
              object : DefaultReactActivityDelegate(
                  this,
                  mainComponentName,
                  fabricEnabled
              ){})
      }
}
