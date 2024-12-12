import { TextStyle, ViewStyle } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Typography } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators"

export const GetStartedScreen = observer(() => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { themed } = useAppTheme()

  const onGetMealPressed = () => {
    navigation.navigate("DishDetails")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={themed($containerViewStyle)}>
      <Typography style={themed($questionTextStyle)} tx="getStartedScreen:title" />
      <Button onPress={onGetMealPressed} tx="getStartedScreen:cta" hitSlop={10} />
    </Screen>
  )
})

const $containerViewStyle: ThemedStyle<ViewStyle> = ({}) => ({
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
