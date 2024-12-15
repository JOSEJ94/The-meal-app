import { ViewStyle } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { Button, Screen, Typography, TypographyVariant } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators"
import { translate } from "@/i18n"

export const GetStartedScreen = observer(() => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { themed } = useAppTheme()

  const onGetMealPressed = () => {
    navigation.navigate("DishDetails")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={themed($containerViewStyle)}>
      <Typography variant={TypographyVariant.TITLE} tx="getStartedScreen:title" />
      <Button
        testID="getMealBtn"
        accessibilityHint={translate("getStartedScreen:ctaHint")}
        onPress={onGetMealPressed}
        tx="getStartedScreen:cta"
      />
    </Screen>
  )
})

const $containerViewStyle: ThemedStyle<ViewStyle> = ({}) => ({
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  gap: 20,
})
