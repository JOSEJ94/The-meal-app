import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DishStoreModel } from "./DishStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  dishStore: DishStoreModel,
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
