import type { NextPage } from "next";
import Head from "next/head";
import data from "../resources/alchemy.json";
import { useState } from "react";
import Ingredient from "../components/Ingredient";

const Home: NextPage = () => {
  const [filteredEffects, setFilteredEffects] = useState<string[]>([]);

  const { effects, ingredients } = data;

  return (
    <>
      <Head>
        <title>Alchemy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="text-xl font-medium">Skyrim - Alchemy minigame</h1>
      </header>
      <main className="my-6 max-w-screen-xl mx-auto px-4 xl:px-0 grid grid-cols-2 gap-6">
        <section className="grid grid-cols-2 gap-2 max-h-0">
          {effects.map((effect) =>
            filteredEffects.includes(effect) ? (
              <div
                key={effect}
                className="select-none py-2 px-4 border-2 border-green-200 rounded-lg bg-green-100 hover:bg-green-200 text-green-500 hover:text-green-700 cursor-pointer"
                onClick={() => {
                  setFilteredEffects((f) => f.filter((e) => e !== effect));
                }}
              >
                - {effect}
              </div>
            ) : (
              <div
                key={effect}
                className="select-none py-2 px-4 border-2 border-red-200 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => {
                  setFilteredEffects((f) => f.concat(effect));
                }}
              >
                + {effect}
              </div>
            )
          )}
        </section>
        <section className="grid grid-cols-3 gap-16">
          {filteredEffects.length === 0 && ingredients.map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} className="w-full" />)}
          {filteredEffects.length > 0 && ingredients.filter((ingredient) => filteredEffects.every((e) => ingredient.effects.includes(e))).map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} />)}
        </section>
      </main>
    </>
  );
};

export default Home;
