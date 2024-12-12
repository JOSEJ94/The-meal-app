import React from "react"
import { render } from "@testing-library/react-native"
import { Typography } from "./Typography"
import { translate } from "@/i18n"
import { useAppTheme } from "@/utils/useAppTheme"

type UseAppThemeMock = jest.MockedFunction<typeof useAppTheme>
jest.mock("@/utils/useAppTheme", () => ({
  useAppTheme: jest.fn(),
}))

jest.mock("@/i18n", () => ({
  translate: jest.fn(),
}))

describe("Typography component", () => {
  beforeEach(() => {
    // Mock the themed styles
    ;(useAppTheme as UseAppThemeMock).mockReturnValue({
      themed: jest.fn((style) =>
        style({ spacing: { xs: 8 }, colors: { palette: { neutral100: "#FFF" } } }),
      ),
      theme: {
        spacing: { xs: 8 },
      },
    })
  })

  it("renders the text passed via the text prop", () => {
    const { getByText } = render(<Typography text="Hello World" />)

    expect(getByText("Hello World")).toBeTruthy()
  })

  it("renders the translated text when tx prop is provided", () => {
    ;(translate as jest.Mock).mockReturnValue("Translated Text")

    const { getByText } = render(<Typography tx="common:back" />)

    expect(getByText("Translated Text")).toBeTruthy()
    expect(translate).toHaveBeenCalledWith("common:back", undefined)
  })

  it("renders children when provided", () => {
    const { getByText } = render(<Typography>Child Content</Typography>)

    expect(getByText("Child Content")).toBeTruthy()
  })

  it("applies custom style correctly", () => {
    const { getByText } = render(<Typography text="Styled Text" style={{ fontSize: 20 }} />)

    const textElement = getByText("Styled Text")
    const style = Array.isArray(textElement.props.style)
      ? Object.assign({}, ...textElement.props.style)
      : textElement.props.style

    expect(style).toMatchObject({ fontSize: 20 })
  })
})
