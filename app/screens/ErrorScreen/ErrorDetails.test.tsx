import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { ErrorDetails } from "./ErrorDetails"
import { useAppTheme } from "@/utils/useAppTheme"
import { lightTheme as mockedLightTheme } from "@/theme"
import { Metrics, SafeAreaProvider } from "react-native-safe-area-context"
import { REFERENCE_HEIGHT, REFERENCE_WIDTH } from "@/theme/scalingReference"

// With null it will not render any screen, so these empty values (but valid) will do the trick
const initialWindowMetrics: Metrics = {
  frame: { height: REFERENCE_HEIGHT, width: REFERENCE_WIDTH, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
}

jest.mock("@/utils/useAppTheme", () => ({
  useAppTheme: jest.fn(),
}))

describe("ErrorDetails Component", () => {
  const mockOnReset = jest.fn()

  const mockProps = {
    error: new Error("Test error"),
    errorInfo: {
      componentStack: "at ComponentA\nat ComponentB",
    },
    onReset: mockOnReset,
  }

  const mockTheme = {
    theme: mockedLightTheme,
    themed: jest.fn((style) => style),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppTheme as jest.Mock).mockReturnValue(mockTheme)
  })

  it("renders the component correctly", () => {
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorDetails {...mockProps} />
      </SafeAreaProvider>,
    )

    expect(getByText("errorScreen:title")).toBeTruthy()
    expect(getByText("errorScreen:friendlySubtitle")).toBeTruthy()
    expect(getByText("Error: Test error")).toBeTruthy()
    expect(getByText("at ComponentA\nat ComponentB")).toBeTruthy()
  })

  it("displays error info even if no `componentStack` is provided", () => {
    const modifiedProps = { ...mockProps, errorInfo: null }
    const { queryByText } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorDetails {...modifiedProps} />
      </SafeAreaProvider>,
    )

    expect(queryByText("at ComponentA\nat ComponentB")).toBeNull()
  })

  it("calls `onReset` when the reset button is pressed", () => {
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorDetails {...mockProps} />
      </SafeAreaProvider>,
    )
    const resetButton = getByText("errorScreen:reset")

    fireEvent.press(resetButton)
    expect(mockOnReset).toHaveBeenCalledTimes(1)
  })

  it("applies themed styles correctly", () => {
    render(
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorDetails {...mockProps} />
      </SafeAreaProvider>,
    )
    expect(mockTheme.themed).toHaveBeenCalledWith(expect.any(Function))
    expect(mockTheme.themed).toHaveBeenCalledTimes(14)
  })
})
