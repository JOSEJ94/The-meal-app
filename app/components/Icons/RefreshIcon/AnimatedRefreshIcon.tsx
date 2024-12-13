import React, { useEffect } from "react"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from "react-native-reanimated"
import RefreshIcon from "./RefreshIcon" // Replace with your actual SVG component

interface AnimatedRefreshIconProps {
  loading: boolean
}

export const AnimatedRefreshIcon = ({ loading }: AnimatedRefreshIconProps) => {
  const rotation = useSharedValue(0)

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(withTiming(360, { duration: 400, easing: Easing.linear }), -1)
    } else {
      cancelAnimation(rotation)
      rotation.value = 0
    }
  }, [loading, rotation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <RefreshIcon />
    </Animated.View>
  )
}
