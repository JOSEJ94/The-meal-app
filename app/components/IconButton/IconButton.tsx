import { TouchableHighlight, TouchableHighlightProps, ViewStyle } from "react-native"
import React from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"

export interface IconButtonProps extends TouchableHighlightProps {}

export const IconButton = ({
  children,
  disabled,
  style,
  underlayColor,
  ...rest
}: IconButtonProps) => {
  const { themed, theme } = useAppTheme()

  return (
    <TouchableHighlight
      accessibilityRole="button"
      style={[themed($baseViewStyle, { disabled }), style]}
      hitSlop={theme.spacing.xs}
      underlayColor={underlayColor || theme.colors.tintShadow}
      disabled={disabled}
      {...rest}
    >
      {children}
    </TouchableHighlight>
  )
}

const $baseViewStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }, { disabled }) => ({
  backgroundColor: disabled ? colors.tintInactive : colors.accentTint,
  borderRadius: 100,
  padding: spacing.md,
  justifyContent: "center",
  alignItems: "center",
  width: 60,
  height: 60,
})
