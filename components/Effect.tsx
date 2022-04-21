import React from "react";
import data from "../resources/alchemy.json";

type Props = {
  effect: string;
  className?: string;
  filter?: string[];
};

export default function Effect({ effect, className, filter }: Props) {
  // data from json file
  const { ingredients } = data;

  // get ingredients from the filter using their names
  const realFilter = filter?.map((ingredient) => ingredients.find((i) => i.name === ingredient));

  return <div className={`py-2 px-4 ${realFilter !== undefined && (realFilter.some((i) => i?.effects.includes(effect)) ? "text-green-500 font-medium" : "text-gray-600")} ${className || ""}`}>{effect}</div>;
}
