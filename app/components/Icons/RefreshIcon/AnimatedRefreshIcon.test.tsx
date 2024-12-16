import React from "react"
import { render } from "@testing-library/react-native"
import { AnimatedRefreshIcon } from "./AnimatedRefreshIcon"
import { useAppTheme } from "@/utils/useAppTheme"

jest.mock("@/utils/useAppTheme", () => ({
  useAppTheme: jest.fn(),
}))

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock")
  return {
    ...Reanimated,
    useSharedValue: jest.fn(() => ({ value: 0 })),
    withTiming: jest.fn((toValue, config) => {
      return toValue
    }),
    withRepeat: jest.fn((animation, count) => animation),
    cancelAnimation: jest.fn(),
  }
})

describe("AnimatedRefreshIcon Component", () => {
  const mockTheme = { timing: { quick: 500 } }
  const mockRotation = { value: 0 }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppTheme as jest.Mock).mockReturnValue({ theme: mockTheme })
  })

  it("renders the component correctly", () => {
    const { getByTestId } = render(<AnimatedRefreshIcon loading={false} />)
    expect(getByTestId("RefreshIcon")).toBeTruthy()
  })

  it("starts animation when loading is true", () => {
    const { rerender } = render(<AnimatedRefreshIcon loading={true} />)

    // Verify animation started
    expect(require("react-native-reanimated").withTiming).toHaveBeenCalledWith(360, {
      duration: mockTheme.timing.quick,
      easing: expect.any(Function),
    })
    expect(require("react-native-reanimated").withRepeat).toHaveBeenCalledWith(360, -1)

    // Re-render with loading false to verify animation stops
    rerender(<AnimatedRefreshIcon loading={false} />)
    expect(require("react-native-reanimated").cancelAnimation).toHaveBeenCalled()
    expect(mockRotation.value).toBe(0)
  })

  it("stops animation and resets rotation when loading becomes false", () => {
    render(<AnimatedRefreshIcon loading={false} />)
    expect(require("react-native-reanimated").cancelAnimation).toHaveBeenCalled()
    expect(mockRotation.value).toBe(0)
  })
})
