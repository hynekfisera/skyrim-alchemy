import React from "react";
import type { Ingredient as IngredientType } from "../types/Ingredient";
import Image from "next/image";

type Props = {
  ingredient: IngredientType;
  className?: string;
  children?: React.ReactNode;
  filter?: string[];
};

export default function Ingredient({ ingredient, className, children, filter }: Props) {
  const { effects, image, name } = ingredient;

  return (
    <div className={`flex flex-col items-center ${className || ""}`}>
      <Image src={image} alt={name} layout="fixed" width={48} height={48} />
      <strong className="font-medium my-1 text-gray-900">{name}</strong>
      <ul className="w-full">
        {effects.map((effect) => (
          <li key={effect} className={`text-sm ${filter?.includes(effect) ? "text-green-500 font-medium" : "text-gray-600"}`}>
            {effect}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
