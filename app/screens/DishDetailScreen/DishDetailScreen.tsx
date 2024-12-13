import { ActivityIndicator, Linking, RefreshControl, ScrollView, View } from "react-native"
import React, { useEffect, useMemo, useState } from "react"
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
import { useAppTheme } from "@/utils/useAppTheme"
import { useOrientation } from "@/utils/useOrientation"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AnimatedRefreshIcon } from "@/components/Icons/RefreshIcon/AnimatedRefreshIcon"
import FastImage from "react-native-fast-image"
import { Dish } from "@/services/api"
import { createStyles } from "./DishDetailScreen.style"

export const DishDetailScreen = observer(() => {
  const { theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets])
  const { dishStore } = useStores()
  const isPortrait = useOrientation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { fetchRandomDish, error, loading, results } = dishStore
  const dish = results.length ? (results[0] as Dish) : null

  const loadRandomDish = async () => await fetchRandomDish()

  const refreshDish = async () => {
    setIsRefreshing(true)
    await loadRandomDish()
    setIsRefreshing(false)
  }

  const refreshControl = <RefreshControl refreshing={isRefreshing} onRefresh={refreshDish} />

  const onOpenVideoPress = async () => {
    // I was using Linking.canOpenURL before, but it does not work correctly on Android for some reason
    try {
      Linking.openURL(dish?.strYoutube!)
    } catch (err: any) {
      console.error(
        `Url could not be opened on the device ${dish?.strYoutube} because: ${err.message}`,
      )
    }
  }

  const renderDishDetailInformation = () => (
    <>
      <Typography variant={TypographyVariant.TITLE} style={styles.title}>
        {dish?.strMeal}
      </Typography>
      <Typography
        variant={TypographyVariant.SUBTITLE}
        tx="dishDetailScreen:ingredientsTitle"
        style={styles.ingredient}
      />
      {dish?.ingredients?.map((ingredient: string, idx: number) => (
        <Typography key={`ing-${idx}`}>• {ingredient}</Typography>
      ))}
      <Typography
        variant={TypographyVariant.SUBTITLE}
        tx="dishDetailScreen:instructionsTitle"
        style={styles.instructionsTitle}
      />
      {Boolean(dish?.strYoutube) && (
        <Button
          variant={ButtonVariant.SECONDARY}
          tx="dishDetailScreen:openVideo"
          onPress={onOpenVideoPress}
        />
      )}
      <Typography style={styles.instructions}>{dish?.strInstructions}</Typography>
    </>
  )

  const renderDishDetailImage = () => (
    <FastImage source={{ uri: dish?.strMealThumb, cache: "immutable" }} style={styles.image} />
  )

  useEffect(() => {
    loadRandomDish()
  }, [])

  if (loading && !isRefreshing) {
    return (
      <Screen contentContainerStyle={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.accentTint} />
        <Typography variant={TypographyVariant.SUBTITLE} tx="dishDetailScreen:loading" />
      </Screen>
    )
  }

  const content = isPortrait ? (
    <>
      <View style={styles.imagePortraitContainer}>{renderDishDetailImage()}</View>
      <IconButton
        onPress={refreshDish}
        disabled={loading || isRefreshing}
        style={{ top: 220, right: 20, position: "absolute" }}
      >
        <AnimatedRefreshIcon loading={isRefreshing} />
      </IconButton>
      <View style={styles.informationContainer}>{renderDishDetailInformation()}</View>
    </>
  ) : (
    <View style={styles.landScapeContainer}>
      <View style={styles.imageLandscapeContainer}>{renderDishDetailImage()}</View>
      <IconButton
        onPress={refreshDish}
        disabled={loading || isRefreshing}
        style={{ left: 10 + insets.left / 2, bottom: 15, position: "absolute" }}
      >
        <AnimatedRefreshIcon loading={isRefreshing} />
      </IconButton>
      <ScrollView
        refreshControl={refreshControl}
        contentContainerStyle={styles.informationContainer}
        style={styles.informationContentContainer}
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