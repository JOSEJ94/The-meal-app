import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { Button, ButtonVariant } from "./Button"
import { translate, TxKeyPath } from "@/i18n"
import { StyleSheet } from "react-native"

describe("Button Component", () => {
  it("renders correctly with text prop", () => {
    const { getByText } = render(<Button text="Click Me" />)
    expect(getByText("Click Me")).toBeTruthy()
  })

  it("renders correctly with tx prop and calls translate", () => {
    const txKey: TxKeyPath = "common:cancel"
    render(<Button tx={txKey} />)
    expect(translate).toHaveBeenCalledWith(txKey, undefined)
  })

  it("applies the correct styles for primary variant", () => {
    const { getByRole } = render(<Button text="Primary" variant={ButtonVariant.PRIMARY} />)
    const button = getByRole("button")
    expect(button.props.style).toEqual([
      {
        backgroundColor: "#731DF7",
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      undefined,
    ])
  })

  it("applies the correct styles for secondary variant", () => {
    const { getByRole } = render(<Button text="Secondary" variant={ButtonVariant.SECONDARY} />)
    const button = getByRole("button")
    expect(button.props.style).toEqual([
      {
        alignSelf: "flex-start",
        backgroundColor: "#D3D3D3",
        borderRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      undefined,
    ])
  })

  it("triggers onPress when pressed", () => {
    const onPressMock = jest.fn()
    const { getByRole } = render(<Button text="Click Me" onPress={onPressMock} />)
    const button = getByRole("button")
    fireEvent.press(button)
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("applies custom text style", () => {
    const customTextStyle = { fontSize: 20 }
    const { getByText } = render(<Button text="Styled" textStyle={customTextStyle} />)
    const text = getByText("Styled")
    const flattenStyles = StyleSheet.flatten(text.props.style)
    expect(flattenStyles).toEqual(expect.objectContaining(customTextStyle))
  })
})
