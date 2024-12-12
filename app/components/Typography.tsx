import { View, Text, TextProps, TextStyle, StyleProp } from "react-native"
import React from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { translate, TxKeyPath } from "@/i18n"
import { TOptions } from "i18next"

interface TypographyProps extends TextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
}

export const Typography = ({ children, tx, txOptions, ...rest }: TypographyProps) => {
  const { themed } = useAppTheme()
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || children

  return <Text {...rest}>{content}</Text>
}
