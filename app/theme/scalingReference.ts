import { Dimensions } from "react-native"

// Reference dimensions for iPhone 16 Pro, which is the device I used as a reference for developing this app.
// Usually, I would use the designer reference device
export const REFERENCE_WIDTH = 390
export const REFERENCE_HEIGHT = 844

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const SCALE_FACTOR = SCREEN_WIDTH / REFERENCE_WIDTH

/**
 * Scales a given value based on the screen size relative to the reference device.
 * @param value The base spacing value to scale.
 * @returns The scaled spacing value.
 */
export const scaleValue = (value: number) => Math.round(value * SCALE_FACTOR)
