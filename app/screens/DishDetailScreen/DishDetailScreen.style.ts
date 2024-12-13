import { Theme } from "@/theme"
import { StyleSheet } from "react-native"
import { EdgeInsets } from "react-native-safe-area-context"

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    loaderContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      gap: theme.spacing.lg,
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
    imagePortraitContainer: {
      maxHeight: 250,
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
