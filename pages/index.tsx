import type { NextPage } from "next";
import Head from "next/head";
import data from "../resources/alchemy.json";
import { useState, SyntheticEvent } from "react";
import Ingredient from "../components/Ingredient";

const Home: NextPage = () => {
  const [filteredEffects, setFilteredEffects] = useState<String[]>([]);

  const { effects, ingredients } = data;

  return (
    <>
      <Head>
        <title>Alchemy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-6">
        <h1 className="text-xl font-medium">Skyrim - Alchemy minigame</h1>
        <section className="my-4 flex-col">
          {effects.map((effect) =>
            filteredEffects.includes(effect) ? (
              <div
                key={effect}
                className="text-green-500"
                onClick={() => {
                  setFilteredEffects((f) => f.filter((e) => e !== effect));
                }}
              >
                - {effect}
              </div>
            ) : (
              <div
                key={effect}
                className="text-red-500"
                onClick={() => {
                  const temp = filteredEffects;
                  temp.push(effect);
                  setFilteredEffects(temp);
                }}
              >
                + {effect}
              </div>
            )
          )}
        </section>
        <section className="grid grid-cols-6 gap-16">
          {filteredEffects.length === 0 && ingredients.map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} className="w-full" />)}
          {filteredEffects.length > 0 && ingredients.filter((ingredient) => ingredient.effects.every((e) => filteredEffects.includes(e))).map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} />)}
        </section>
      </main>
    </>
  );
};

export default Home;
