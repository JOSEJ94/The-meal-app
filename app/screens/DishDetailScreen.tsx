import {
  ActivityIndicator,
  Image,
  ImageStyle,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  ViewStyle,
} from "react-native"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "@/models"
import {
  Button,
  ButtonVariant,
  IconButton,
  Screen,
  Typography,
  TypographyVariant,
} from "@/components"
import { spacing, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useOrientation } from "@/utils/useOrientation"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const DishDetailScreen = observer(() => {
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const { dishStore } = useStores()
  const isPortrait = useOrientation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { fetchRandomDish, error, loading, results } = dishStore
  const dish = results.length ? results[0] : null

  const getFromApi = async () => await fetchRandomDish()

  const refreshDish = async () => {
    setIsRefreshing(true)
    await getFromApi()
    setIsRefreshing(false)
  }

  const refreshControl = <RefreshControl refreshing={isRefreshing} onRefresh={refreshDish} />

  const onOpenVideoPress = async () => {
    const canBeOpened = await Linking.canOpenURL(dish.strYoutube)
    if (canBeOpened) {
      Linking.openURL(dish.strYoutube)
    }
  }

  const renderDishDetailInformation = () => (
    <>
      <Typography variant={TypographyVariant.TITLE} style={themed($titleStyle)}>
        {dish?.strMeal}
      </Typography>
      <Typography
        variant={TypographyVariant.SUBTITLE}
        tx="dishDetailScreen:ingredientsTitle"
        style={themed($ingredientsStyle)}
      />
      {dish?.ingredients.map((ingredient: string, idx: number) => (
        <Typography key={`ing-${idx}`}>• {ingredient}</Typography>
      ))}
      <Typography
        variant={TypographyVariant.SUBTITLE}
        tx="dishDetailScreen:instructionsTitle"
        style={themed($instructionsTitleStyle)}
      />
      <Button
        variant={ButtonVariant.SECONDARY}
        tx="dishDetailScreen:openVideo"
        onPress={onOpenVideoPress}
      />
      <Typography style={themed($instructionsStyle)}>{dish?.strInstructions}</Typography>
    </>
  )

  const renderDishDetailImage = () => (
    <Image source={{ uri: dish?.strMealThumb }} style={themed($imageStyle)} />
  )

  useEffect(() => {
    getFromApi()
  }, [])

  if (loading && !isRefreshing) {
    return (
      <Screen contentContainerStyle={themed($loadingContainerViewStyle)}>
        <ActivityIndicator size="large" color={theme.colors.accentTint} />
        <Typography variant={TypographyVariant.SUBTITLE} tx="dishDetailScreen:loading" />
      </Screen>
    )
  }

  const content = isPortrait ? (
    <>
      <View style={themed($imagePortraitContainerStyle)}>{renderDishDetailImage()}</View>
      <IconButton
        onPress={fetchRandomDish}
        disabled={loading}
        style={{ top: 220, right: 20, position: "absolute" }}
      >
        <Typography>+</Typography>
      </IconButton>
      <View style={themed($informationContainerViewStyle)}>{renderDishDetailInformation()}</View>
    </>
  ) : (
    <View style={themed($landScapeContainerViewStyle)}>
      <View style={themed($imageLandscapeContainerStyle)}>{renderDishDetailImage()}</View>
      <ScrollView
        refreshControl={refreshControl}
        style={[
          themed($informationContainerViewStyle),
          { paddingRight: spacing.md + insets.right },
        ]}
      >
        {renderDishDetailInformation()}
      </ScrollView>
    </View>
  )

  return (
    <Screen
      preset={isPortrait ? "scroll" : "fixed"}
      ScrollViewProps={{
        refreshControl: refreshControl,
      }}
    >
      {content}
    </Screen>
  )
})

const $loadingContainerViewStyle: ThemedStyle<ViewStyle> = ({}) => ({
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  gap: 20,
})

const $titleStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $ingredientsStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $instructionsStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.xs,
})

const $instructionsTitleStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  marginBottom: spacing.xxs,
})

const $imagePortraitContainerStyle: ThemedStyle<ImageStyle> = ({}) => ({
  maxHeight: 250,
})

const $imageLandscapeContainerStyle: ThemedStyle<ImageStyle> = ({}) => ({
  flex: 1,
})

const $imageStyle: ThemedStyle<ImageStyle> = ({}) => ({
  width: "100%",
  height: "100%",
})

const $landScapeContainerViewStyle: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
})

const $informationContainerViewStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.md,
})
