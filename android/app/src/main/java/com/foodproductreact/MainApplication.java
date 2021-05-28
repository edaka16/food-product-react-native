package com.foodproductreact;

import android.app.Application;
import android.content.Context;
import android.net.Uri;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.foodproductreact.generated.BasePackageList;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;
import expo.modules.updates.UpdatesController;

import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import javax.annotation.Nullable;

import android.os.StrictMode; 
import android.os.Build; 
import android.os.Handler;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
    new BasePackageList().getPackageList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new ModuleRegistryAdapter(mModuleRegistryProvider));
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected JSIModulePackage getJSIModulePackage() {
      return new ReanimatedJSIModulePackage();
    }

    @Override
    protected @Nullable String getJSBundleFile() {
      if (BuildConfig.DEBUG) {
        return super.getJSBundleFile();
      } else {
        return UpdatesController.getInstance().getLaunchAssetFile();
      }
    }

    @Override
    protected @Nullable String getBundleAssetName() {
      if (BuildConfig.DEBUG) {
        return super.getBundleAssetName();
      } else {
        return UpdatesController.getInstance().getBundleAssetName();
      }
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override

  public void onCreate() {

     if (BuildConfig.DEBUG) {
      strictModePermitAll();
    }

    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    if (!BuildConfig.DEBUG) {
      UpdatesController.initialize(this);
    }

    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

   private static void strictModePermitAll() {
    StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
    StrictMode.setThreadPolicy(policy);

    if (Build.VERSION.SDK_INT >= 16) {
      //restore strict mode after onCreate() returns. https://issuetracker.google.com/issues/36951662
      new Handler().postAtFrontOfQueue(new Runnable() {
        @Override
        public void run() {
          StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
          StrictMode.setThreadPolicy(policy);
        }
      });
    }
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.foodproductreact.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
