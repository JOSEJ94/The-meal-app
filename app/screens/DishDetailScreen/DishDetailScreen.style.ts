import { Theme } from "@/theme"
import { Dimensions, StyleSheet } from "react-native"
import { EdgeInsets } from "react-native-safe-area-context"

const { height } = Dimensions.get("screen")
export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    loaderContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      gap: theme.spacing.lg,
    },
    errorContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    errorTitle: {
      textAlign: "center",
      marginHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    errorDescription: {
      marginHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    ingredient: {
      marginBottom: theme.spacing.sm,
    },
    title: {
      marginBottom: theme.spacing.md,
    },
    instructions: {
      marginVertical: theme.spacing.xs,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    instructionsTitle: {
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xxs,
    },
    refreshPortraitButton: {
      top: height * 0.33 - 30, // Image height(a 3rd of the screen height) - half the button height
      right: theme.spacing.lg,
      position: "absolute",
    },
    refreshLandscapeButton: {
      left: theme.spacing.sm + insets.left / 2,
      bottom: theme.spacing.md,
      position: "absolute",
    },
    imagePortraitContainer: {
      maxHeight: height * 0.33, // Image height(a 3rd of the screen height)
    },
    imageLandscapeContainer: {
      flex: 1,
    },
    informationContentContainer: {
      flex: 1,
      paddingRight: theme.spacing.md + insets.right,
      marginBottom: insets.bottom,
    },
    informationContainer: {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    landScapeContainer: {
      flexDirection: "row",
    },
  })
