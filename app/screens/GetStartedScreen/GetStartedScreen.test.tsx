import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { GetStartedScreen } from "./GetStartedScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators"

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()
jest.mock("@react-navigation/native", () => {
  const actualNavigation = jest.requireActual("@react-navigation/native")
  return {
    ...actualNavigation,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  }
})

describe("GetStartedScreen", () => {
  const Stack = createNativeStackNavigator<AppStackParamList>()

  it("renders the screen correctly", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    )
    const button = getByTestId("getMealBtn")
    const text = getByText("getStartedScreen:cta")
    expect(text).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it("includes the correct accessibility hint for the button", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    )
    const button = getByTestId("getMealBtn")

    expect(button.props.accessibilityHint).toBe("getStartedScreen:ctaHint")
  })

  it("navigates to 'DishDetails' when the button is pressed", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    )

    const button = getByTestId("getMealBtn")
    fireEvent.press(button)

    expect(mockNavigate).toHaveBeenCalledWith("DishDetails")
  })
})
