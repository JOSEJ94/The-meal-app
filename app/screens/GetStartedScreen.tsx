import { TextStyle, ViewStyle } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Typography } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

export const GetStartedScreen = observer(() => {
  const { themed } = useAppTheme()

  const onGetMealPressed = () => {
    console.log("Press")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={themed($containerViewStyle)}>
      <Typography style={themed($questionTextStyle)}>Are you hungry?</Typography>
      <Button onPress={onGetMealPressed} text="Get me a meal!" hitSlop={10} />
    </Screen>
  )
})

const $containerViewStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  gap: 20,
})

const $questionTextStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  fontSize: 28,
  fontWeight: "bold",
})
