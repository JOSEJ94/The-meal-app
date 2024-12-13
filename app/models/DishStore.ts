import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { fetch as fetchNetworkStatus, NetInfoState } from "@react-native-community/netinfo"

/**
 * A RootStore model.
 */
export const DishStoreModel = types
  .model("DishStore")
  .props({
    results: types.optional(types.array(types.frozen()), []),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
    previousResults: types.optional(types.array(types.frozen()), []),
  })
  .actions((self) => ({
    fetchRandomDish: flow(function* () {
      if (self.loading) return
      const lastResult = self.results[0]?.idMeal || null
      self.results.clear()
      self.loading = true
      self.error = ""
      try {
        const networkStatus: NetInfoState = yield fetchNetworkStatus()
        if (networkStatus.isInternetReachable) {
          // FIXME: process.env should go into an unique file, so it is ready just once to improve loading times.
          const response = yield fetch(`${process.env.EXPO_PUBLIC_API_URL}random.php`)
          if (response.status >= 200 && response.status < 300) {
            const data = yield response.json()
            const meals = data.meals.map((meal: any) => {
              const ingredients = Object.keys(meal)
                .filter((key) => key.startsWith("strIngredient") && meal[key]?.trim() !== "")
                .map((key) => meal[key])

              return { ...meal, ingredients }
            })
            const previouslyAdded = self.previousResults.find(
              (dish) => meals[0].idMeal === dish.idMeal,
            )
            if (!previouslyAdded) {
              self.previousResults.push(meals[0])
            }
            self.results = meals
          }
        } else {
          const filteredResults = self.previousResults.filter((dish) => dish.idMeal !== lastResult)
          const meal =
            filteredResults.length > 0
              ? filteredResults[Math.floor(Math.random() * filteredResults.length)]
              : null
          if (!meal) throw new Error("There are no dishes we can display")
          self.results = [meal]
        }
      } catch (error: any) {
        console.error(error)
        self.error = error.message
      } finally {
        self.loading = false
      }
    }),
  }))

/**
 * The RootStore instance.
 */
export interface DishStore extends Instance<typeof DishStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface DishStoreSnapshot extends SnapshotOut<typeof DishStoreModel> {}
