import {
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
} from "react-native"
import React from "react"
import { translate, TxKeyPath } from "@/i18n"
import { TOptions } from "i18next"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"

export enum ButtonVariant {
  PRIMARY,
  SECONDARY,
}

export interface ButtonProps extends TouchableHighlightProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Style to be merged with current text style.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions
}

export const Button = ({
  text,
  tx,
  txOptions,
  children,
  textStyle,
  style,
  ...rest
}: ButtonProps) => {
  const { themed, theme } = useAppTheme()
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <TouchableHighlight
      accessibilityRole="button"
      style={[themed($baseViewStyle), style]}
      hitSlop={theme.spacing.xs}
      {...rest}
    >
      <Text style={[themed($baseTextStyle), textStyle]}>{content}</Text>
    </TouchableHighlight>
  )
}

const $baseViewStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.tint,
  borderRadius: 4,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
})

const $baseTextStyle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  textTransform: "uppercase",
  color: colors.palette.neutral100,
  fontWeight: "bold",
})
