import "@expo/metro-runtime"
import * as SplashScreen from "expo-splash-screen"
import App from "@/app"
import { useEffect } from "react"
import { Platform } from "react-native"

SplashScreen.preventAutoHideAsync()

if (Platform.OS === "web") {
  global._WORKLET = false
  // @ts-expect-error
  global._log = console.log
  // @ts-expect-error
  global._getAnimationTimestamp = () => performance.now()
}

function IgniteApp() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
