import { Pressable, Text, View } from "react-native"
import React from "react"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { Screen } from "@/components"

interface GetStartedScreenProps extends AppStackScreenProps<"GetStarted"> {}

export const GetStartedScreen = observer(({}: GetStartedScreenProps) => {
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
