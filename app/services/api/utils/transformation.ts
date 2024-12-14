import { Dish } from "../api.types"

/**
 * Util to create an array in the meals object to it's easier to iterate over it. It just adds the field, and does not remove the original fields in case they're needed.
 * @param meal A meal that needs to convert its ingredients and measure fields into an Dish with an ingredient list
 * @returns A meal with an extra field ingredients where you can see each ingredient with its quantity
 */
export const fromIngredientFieldsToList = (meal: Dish) => {
  const ingredients = Array.from({ length: 20 }, (_, idx) => {
    const ingredientName = meal[`strIngredient${idx + 1}` as keyof Dish]
    const ingredientAmount = meal[`strMeasure${idx + 1}` as keyof Dish]
    return ingredientName ? `${ingredientName}: ${ingredientAmount}` : null
  }).filter(Boolean)
  return { ...meal, ingredients } as Dish
}
