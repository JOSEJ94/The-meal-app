import React from "react"
import { render } from "@testing-library/react-native"
import { Typography, TypographyVariant } from "./Typography"
import { translate } from "@/i18n"
import { TOptions } from "i18next"

describe("Typography Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Typography text="Default text" />)
    const textElement = getByText("Default text")
    expect(textElement).toBeTruthy()
  })

  it("renders the correct variant style for TITLE variant", () => {
    const { getByText } = render(<Typography text="Title text" variant={TypographyVariant.TITLE} />)
    const textElement = getByText("Title text")
    expect(textElement.props.style).toEqual([
      expect.objectContaining({ color: "#191015", fontSize: 28, fontWeight: "bold" }),
      undefined,
    ])
  })

  it("renders the correct variant style for CAPTION variant", () => {
    const { getByText } = render(
      <Typography text="Title text" variant={TypographyVariant.CAPTION} />,
    )
    const textElement = getByText("Title text")
    expect(textElement.props.style).toEqual([
      expect.objectContaining({ color: "#191015", fontSize: 14, fontStyle: "italic" }),
      undefined,
    ])
  })

  it("renders the correct variant style for SUBTITLE variant", () => {
    const { getByText } = render(
      <Typography text="Title text" variant={TypographyVariant.SUBTITLE} />,
    )
    const textElement = getByText("Title text")
    expect(textElement.props.style).toEqual([
      expect.objectContaining({ color: "#564E4A", fontSize: 18, fontWeight: "bold" }),
      undefined,
    ])
  })

  it("renders content from `text` prop", () => {
    const { getByText } = render(<Typography text="Text content" />)
    const textElement = getByText("Text content")
    expect(textElement).toBeTruthy()
  })

  it("renders content from `tx` prop", () => {
    ;(translate as jest.Mock).mockReturnValue("Translated text")
    const { getByText } = render(<Typography tx="common:cancel" />)
    const textElement = getByText("Translated text")
    expect(textElement).toBeTruthy()
    expect(translate).toHaveBeenCalledWith("common:cancel", undefined)
  })

  it("applies custom styles from `style` prop", () => {
    const customStyle = { fontSize: 16, color: "#FF0000" }
    const { getByText } = render(<Typography text="Styled text" style={customStyle} />)
    const textElement = getByText("Styled text")
    expect(textElement.props.style).toContainEqual(expect.objectContaining(customStyle))
  })

  it("renders children when no `text` or `tx` is provided", () => {
    const { getByText } = render(<Typography>Child Content</Typography>)
    const textElement = getByText("Child Content")
    expect(textElement).toBeTruthy()
  })

  it("handles `txOptions` for translations", () => {
    const txOptions: TOptions = { count: 2 }
    ;(translate as jest.Mock).mockReturnValue("Translated text with options")
    const { getByText } = render(<Typography tx="common:cancel" txOptions={txOptions} />)
    const textElement = getByText("Translated text with options")
    expect(textElement).toBeTruthy()
    expect(translate).toHaveBeenCalledWith("common:cancel", txOptions)
  })
})
