import { useState, useEffect } from "react"
import { Dimensions } from "react-native"

export const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(true)

  const updateOrientation = () => {
    const { width, height } = Dimensions.get("window")
    setIsPortrait(height >= width)
  }

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", updateOrientation)
    updateOrientation()

    return () => {
      subscription.remove()
    }
  }, [])

  return isPortrait
}
