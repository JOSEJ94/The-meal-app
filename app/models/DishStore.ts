import { types, flow, Instance, SnapshotOut } from "mobx-state-tree"
import { fetch as fetchNetworkStatus, NetInfoState } from "@react-native-community/netinfo"
import { api, Dish } from "@/services/api"
import { DishModel } from "./models/DishModel"

/**
 * A RootStore model.
 */
export const DishStoreModel = types
  .model("DishStore")
  .props({
    results: types.optional(types.array(types.reference(DishModel)), []),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
    allDishes: types.optional(types.map(DishModel), {}),
  })
  .actions((self) => ({
    fetchRandomDish: flow(function* () {
      if (self.loading) return
      const lastResult = self.results[0]?.idMeal || null
      self.loading = true
      self.error = ""
      try {
        const networkStatus: NetInfoState = yield fetchNetworkStatus()
        if (networkStatus.isInternetReachable) {
          const dishes = yield api.getRandomDish()
          // It only returns 1 dish.
          const dish: Dish = dishes.length ? dishes[0] : null
          if (dish && !self.allDishes.has(dish.idMeal)) {
            self.allDishes.set(dish.idMeal, dish)
            self.results = [self.allDishes.get(dish.idMeal)!]
          }
        } else {
          // Use allDishes for offline results
          const offlineDishes = Array.from(self.allDishes.values())
          // Prevents selecting the same dish over and over
          const filteredResults = offlineDishes.filter((dish) => dish.idMeal !== lastResult)
          const meal =
            filteredResults.length > 0
              ? filteredResults[Math.floor(Math.random() * filteredResults.length)]
              : null
          if (!meal) throw new Error("There are no dishes we can display")
          // @ts-expect-error FIXME: I haven't figured out this type yet
          self.results = [meal]
        }
        self.error = ""
      } catch (error: any) {
        console.log(error)
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
