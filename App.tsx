import "@expo/metro-runtime"
import * as SplashScreen from "expo-splash-screen"
import App from "@/app"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
