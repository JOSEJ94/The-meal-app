import { Pressable, Text } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { Screen } from "@/components"

export const GetStartedScreen = observer(() => {
  const onGetMealPressed = () => {
    console.log("Press")
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <Text>Are you hungry?</Text>
      <Pressable onPress={onGetMealPressed} hitSlop={10}>
        <Text>Get me a meal!</Text>
      </Pressable>
    </Screen>
  )
})
