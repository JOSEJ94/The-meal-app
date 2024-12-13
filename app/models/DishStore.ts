import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"

/**
 * A RootStore model.
 */
export const DishStoreModel = types
  .model("DishStore")
  .props({
    results: types.optional(types.array(types.frozen()), []),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
  })
  .actions((self) => ({
    fetchRandomDish: flow(function* () {
      if (self.loading) return
      self.loading = true
      self.error = ""
      try {
        // FIXME: process.env should go into an unique file, so it is ready just once to improve loading times.
        const response = yield fetch(`${process.env.EXPO_PUBLIC_API_URL}random.php`)
        const data = yield response.json()
        const meals = data.meals.map((meal: any) => {
          const ingredients = Object.keys(meal)
            .filter((key) => key.startsWith("strIngredient") && meal[key]?.trim() !== "")
            .map((key) => meal[key])

          return { ...meal, ingredients }
        })
        self.results = meals
      } catch (error: any) {
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
