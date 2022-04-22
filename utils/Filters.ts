import { Ingredient } from "../types/Ingredient";

export const effectIsCommon = (effect: string, ingredients: Ingredient[]): boolean => {
  // check if there is more than one ingredient filtered with this effect
  return ingredients.filter((i) => i?.effects.includes(effect)).length > 1;
};
