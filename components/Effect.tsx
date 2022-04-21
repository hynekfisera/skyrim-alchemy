import React from "react";
import data from "../resources/alchemy.json";
import { Ingredient } from "../types/Ingredient";
import { effectIsCommon } from "../utils/Filters";

type Props = {
  effect: string;
  className?: string;
  filter?: string[];
};

export default function Effect({ effect, className, filter }: Props) {
  // data from json file
  const { ingredients } = data;

  return <div className={`py-2 px-4 ${filter !== undefined && (effectIsCommon(effect, filter.map((ingredient) => ingredients.find((i) => i.name === ingredient)) as Ingredient[]) ? "text-green-500 font-medium" : "text-gray-600")} ${className || ""}`}>{effect}</div>;
}
