import { Text, TextProps, TextStyle, StyleProp } from "react-native"
import React from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { translate, TxKeyPath } from "@/i18n"
import { TOptions } from "i18next"
import { colors, ThemedStyleArray } from "@/theme"

export enum TypographyVariant {
  TITLE = "Title",
  SUBTITLE = "Subtitle",
  CAPTION = "Caption",
  TEXT = "Text",
}

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
   * One of the different types of text variants.
   */
  variant?: TypographyVariant
}

export const Typography = ({
  children,
  text,
  tx,
  txOptions,
  style,
  variant = TypographyVariant.TEXT,
  ...rest
}: TypographyProps) => {
  const { themed } = useAppTheme()
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <Text style={[themed($typographyStyles[variant]), style]} {...rest}>
      {content}
    </Text>
  )
}

const $typographyStyles: Record<TypographyVariant, ThemedStyleArray<TextStyle>> = {
  Text: [{}],
  Caption: [
    {
      fontStyle: "italic",
      fontSize: 14,
    },
  ],
  Subtitle: [
    {
      color: colors.textDim,
      fontWeight: "bold",
      fontSize: 18,
    },
  ],
  Title: [
    {
      color: colors.text,
      fontSize: 28,
      fontWeight: "bold",
    },
  ],
}
