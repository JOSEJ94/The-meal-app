import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { Button, ButtonVariant } from "./Button"
import { translate } from "@/i18n"
import { useAppTheme } from "@/utils/useAppTheme"

jest.mock("@/utils/useAppTheme", () => ({
  useAppTheme: jest.fn(),
}))

jest.mock("@/i18n", () => ({
  translate: jest.fn(),
}))
const mockUseAppTheme = jest.mocked(useAppTheme)
const mockTranslate = jest.mocked(translate)

describe("Button component", () => {
  beforeEach(() => {
    mockUseAppTheme.mockReturnValue({
      themed: jest.fn((style) =>
        style({
          spacing: { xs: 8, md: 16 },
          colors: { tint: "#000", palette: { neutral100: "#FFF" } },
        }),
      ),
      theme: {
        spacing: { xs: 8 },
      },
    })
  })

  it("renders the text passed via the text prop", () => {
    const { getByText } = render(<Button text="Click me" />)

    expect(getByText("Click me")).toBeTruthy()
  })

  it("renders the translated text when tx prop is provided", () => {
    mockTranslate.mockReturnValue("Translated Text")

    const { getByText } = render(<Button tx="common:ok" />)

    expect(getByText("Translated Text")).toBeTruthy()
    expect(mockTranslate).toHaveBeenCalledWith("common:ok", undefined)
  })

  it("renders children when provided", () => {
    const { getByText } = render(<Button>Child Content</Button>)

    expect(getByText("Child Content")).toBeTruthy()
  })

  it("applies custom textStyle correctly", () => {
    const { getByText } = render(<Button text="Styled" textStyle={{ fontSize: 20 }} />)

    const textElement = getByText("Styled")
    expect(textElement.props.style).toContainEqual({ fontSize: 20 })
  })

  it("applies custom style correctly", () => {
    const { getByRole } = render(<Button text="Styled" style={{ backgroundColor: "red" }} />)

    const buttonElement = getByRole("button")
    expect(buttonElement.props.style).toContainEqual({ backgroundColor: "red" })
  })

  it("handles onPress event", () => {
    const onPressMock = jest.fn()

    const { getByRole } = render(<Button text="Press me" onPress={onPressMock} />)
    const buttonElement = getByRole("button")

    fireEvent.press(buttonElement)
    expect(onPressMock).toHaveBeenCalled()
  })

  it("uses hitSlop from the theme", () => {
    const { getByRole } = render(<Button text="HitSlop Test" />)

    const buttonElement = getByRole("button")
    expect(buttonElement.props.hitSlop).toEqual(8)
  })
})
