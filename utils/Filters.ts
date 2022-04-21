import { Ingredient } from "../types/Ingredient";

export const effectIsCommon = (effect: string, ingredients: Ingredient[]): boolean => {
  return ingredients.filter((i) => i?.effects.includes(effect)).length > 1;
};
