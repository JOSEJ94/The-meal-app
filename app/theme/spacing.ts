import { scaleValue } from "./scalingReference"

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  xxxs: scaleValue(2),
  xxs: scaleValue(4),
  xs: scaleValue(8),
  sm: scaleValue(12),
  md: scaleValue(16),
  lg: scaleValue(24),
  xl: scaleValue(32),
  xxl: scaleValue(48),
  xxxl: scaleValue(64),
} as const
