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
import { ThemedStyle, ThemedStyleArray } from "@/theme"

export enum ButtonVariant {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
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
  /**
   * Button variant that defines the style applied to this button
   */
  variant?: ButtonVariant
}

export const Button = ({
  text,
  tx,
  txOptions,
  children,
  textStyle,
  style,
  variant = ButtonVariant.PRIMARY,
  ...rest
}: ButtonProps) => {
  const { themed, theme } = useAppTheme()
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <TouchableHighlight
      accessibilityRole="button"
      style={[themed($buttonStyles[variant]), style]}
      hitSlop={theme.spacing.xs}
      underlayColor={theme.colors.accentTint}
      {...rest}
    >
      <Text style={[themed($buttonTextStyles[variant]), textStyle]}>{content}</Text>
    </TouchableHighlight>
  )
}

const $primaryButtonStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.tint,
  borderRadius: 4,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
})

const $secondaryButtonStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.subtleInteractiveElement,
  borderRadius: 100,
  alignSelf: "flex-start",
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
})

const $secondaryButtonTextStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  textAlign: "center",
})

const $primaryButtonTextStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  textTransform: "uppercase",
  color: colors.palette.white,
  fontWeight: "bold",
})

const $buttonStyles: Record<ButtonVariant, ThemedStyleArray<ViewStyle>> = {
  Primary: [$primaryButtonStyle],
  Secondary: [$secondaryButtonStyle],
}

const $buttonTextStyles: Record<ButtonVariant, ThemedStyleArray<TextStyle>> = {
  Primary: [$primaryButtonTextStyle],
  Secondary: [$secondaryButtonTextStyle],
}
