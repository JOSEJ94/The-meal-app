import { ThemedStyle } from "@/theme"
import { ViewStyle } from "react-native"

export const $containerViewStyle: ThemedStyle<ViewStyle> = ({}) => ({
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  gap: 20,
})
