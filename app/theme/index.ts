import type { StyleProp } from "react-native"
import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import { spacing } from "./spacing"
import { timing } from "./timing"
import { typography } from "./typography"
import { fontSizes } from "./fontSizes"

// This supports "light" and "dark" themes by default. If undefined, it'll use the system theme
export type ThemeContexts = "light" | "dark" | undefined

// Because we have two themes, we need to define the types for each of them.
// colorsLight and colorsDark should have the same keys, but different values.
export type Colors = typeof colorsLight | typeof colorsDark
// The spacing type needs to take into account the different spacing values for light and dark themes.
export type Spacing = typeof spacing

// These two are consistent across themes.
export type Timing = typeof timing
export type Typography = typeof typography
export type FontSizes = typeof fontSizes

// The overall Theme object should contain all of the data you need to style your app.
export interface Theme {
  colors: Colors
  spacing: Spacing
  typography: Typography
  fontSizes: FontSizes
  timing: Timing
  isDark: boolean
}

// Here we define our themes.
export const lightTheme: Theme = {
  colors: colorsLight,
  spacing: spacing,
  typography,
  fontSizes,
  timing,
  isDark: false,
}
export const darkTheme: Theme = {
  colors: colorsDark,
  spacing: spacing,
  typography,
  fontSizes,
  timing,
  isDark: true,
}

/**
 * Represents a function that returns a styled component based on the provided theme.
 * @template T The type of the style.
 * @param theme The theme object.
 * @returns The styled component.
 *
 * @example
 * const $container: ThemedStyle<ViewStyle> = (theme) => ({
 *   flex: 1,
 *   backgroundColor: theme.colors.background,
 *   justifyContent: "center",
 *   alignItems: "center",
 * })
 * // Then use in a component like so:
 * const Component = () => {
 *   const { themed } = useAppTheme()
 *   return <View style={themed($container)} />
 * }
 */
export type ThemedStyle<T> = (theme: Theme, args?: any) => T
export type ThemedStyleArray<T> = (
  | ThemedStyle<T>
  | StyleProp<T>
  | (StyleProp<T> | ThemedStyle<T>)[]
)[]

// Export the theme objects with backwards compatibility for the old theme structure.
export { colorsLight as colors }
export { colorsDark }
export { spacing }

export * from "./typography"
export * from "./timing"
