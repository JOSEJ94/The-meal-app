import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { DishDetailScreen } from "./DishDetailScreen"
import { useStores } from "@/models"
import { Linking } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators"
import { Metrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Dish } from "@/services/api"
import { useOrientation } from "@/utils/useOrientation"
import { REFERENCE_HEIGHT, REFERENCE_WIDTH } from "@/theme/scalingReference"

jest.mock("@/models", () => ({
  useStores: jest.fn(),
}))

jest.mock("@/utils/useOrientation", () => ({
  useOrientation: jest.fn(),
}))

// With null it will not render any screen, so these empty values (but valid) will do the trick
const initialWindowMetricsPortrait: Metrics = {
  frame: { height: REFERENCE_HEIGHT, width: REFERENCE_WIDTH, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
}

const initialWindowMetricsLandscape: Metrics = {
  frame: { height: REFERENCE_WIDTH, width: REFERENCE_HEIGHT, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
}

describe("DishDetailScreen", () => {
  const Stack = createNativeStackNavigator<AppStackParamList>()

  const mockDish: Dish = {
    strMeal: "Mock Dish",
    strMealThumb: "https://example.com/mock-dish.jpg",
    strInstructions: "Mock instructions.",
    strYoutube: "https://youtube.com/mock-video",
    idMeal: "1",
    dateModified: null,
    strArea: "",
    strCategory: "",
    strCreativeCommonsConfirmed: "",
    strDrinkAlternate: "",
    strImageSource: "",
    strIngredient1: "Ingredient 1",
    strIngredient2: "Ingredient 2",
    strIngredient3: "",
    strIngredient4: "",
    strIngredient5: "",
    strIngredient6: "",
    strIngredient7: "",
    strIngredient8: "",
    strIngredient9: "",
    strIngredient10: "",
    strIngredient11: "",
    strIngredient12: "",
    strIngredient13: "",
    strIngredient14: "",
    strIngredient15: "",
    strIngredient16: "",
    strIngredient17: "",
    strIngredient18: "",
    strIngredient19: "",
    strIngredient20: "",
    strMeasure1: "measure 1",
    strMeasure2: "measure 2",
    strMeasure3: "",
    strMeasure4: "",
    strMeasure5: "",
    strMeasure6: "",
    strMeasure7: "",
    strMeasure8: "",
    strMeasure9: "",
    strMeasure10: "",
    strMeasure11: "",
    strMeasure12: "",
    strMeasure13: "",
    strMeasure14: "",
    strMeasure15: "",
    strMeasure16: "",
    strMeasure17: "",
    strMeasure18: "",
    strMeasure19: "",
    strMeasure20: "",
    strSource: "",
    strTags: "",
    ingredients: ["Ingredient 1: measure 1", "Ingredient 2: measure 2"],
  }

  const mockStore = {
    dishStore: {
      fetchRandomDish: jest.fn(),
      error: null,
      loading: false,
      results: [mockDish],
    },
  }

  beforeEach(() => {
    ;(useStores as jest.Mock).mockReturnValue(mockStore)
    ;(useOrientation as jest.Mock).mockReturnValue(true)
  })

  it("renders the dish details correctly in portrait", () => {
    const { getByText, getByTestId } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetricsPortrait}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="DishDetails" component={DishDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    )

    expect(getByText("Mock Dish")).toBeTruthy()
    expect(getByText("• Ingredient 1: measure 1")).toBeTruthy()
    expect(getByText("• Ingredient 2: measure 2")).toBeTruthy()
    expect(getByTestId("openVideoBtn")).toBeTruthy()
  })

  it("renders the dish details correctly in landscape", () => {
    ;(useOrientation as jest.Mock).mockReturnValue(false)

    const { getByText, getByTestId } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetricsLandscape}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="DishDetails" component={DishDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    )

    expect(getByText("Mock Dish")).toBeTruthy()
    expect(getByText("• Ingredient 1: measure 1")).toBeTruthy()
    expect(getByText("• Ingredient 2: measure 2")).toBeTruthy()
    expect(getByTestId("openVideoBtn")).toBeTruthy()
  })

  it("displays a loading indicator when loading", () => {
    ;(useStores as jest.Mock).mockReturnValue({
      ...mockStore,
      dishStore: { ...mockStore.dishStore, loading: true, results: [] },
    })

    const { getByTestId } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetricsPortrait}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={DishDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    expect(getByTestId("loadingSpinner")).toBeTruthy()
  })

  it("displays an error screen when there's an error", () => {
    ;(useStores as jest.Mock).mockReturnValue({
      ...mockStore,
      dishStore: { ...mockStore.dishStore, error: "Error loading dish", results: [] },
    })

    const { getByText, getByTestId } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetricsPortrait}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={DishDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    expect(getByText("dishDetailScreen:errorTitle")).toBeTruthy()
    expect(getByTestId("tryAgainBtn")).toBeTruthy()
  })

  it("refreshes the dish when refresh button is pressed", async () => {
    const { getByTestId } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetricsPortrait}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={DishDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    const refreshButton = getByTestId("refreshDishBtn")

    fireEvent.press(refreshButton)

    await waitFor(() => {
      expect(mockStore.dishStore.fetchRandomDish).toHaveBeenCalled()
    })
  })

  it("opens the YouTube link when the video button is pressed", () => {
    const { getByTestId } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetricsPortrait}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={DishDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    const videoButton = getByTestId("openVideoBtn")

    fireEvent.press(videoButton)

    expect(Linking.openURL).toHaveBeenCalledWith("https://youtube.com/mock-video")
  })

  it("handles a missing YouTube link gracefully", () => {
    ;(useStores as jest.Mock).mockReturnValue({
      ...mockStore,
      dishStore: {
        ...mockStore.dishStore,
        results: [{ ...mockDish, strYoutube: null }],
      },
    })

    const { queryByTestId } = render(
      <SafeAreaProvider initialMetrics={initialWindowMetricsPortrait}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={DishDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    expect(queryByTestId("openVideoBtn")).toBeNull()
  })
})
