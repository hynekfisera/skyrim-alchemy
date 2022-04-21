import type { NextPage } from "next";
import Head from "next/head";
import data from "../resources/alchemy.json";
import { useState, useEffect } from "react";
import Ingredient from "../components/Ingredient";

const Home: NextPage = () => {
  // filter by effects or ingredients
  // true => by effects
  // false => by ingredients
  const [mode, setMode] = useState(true);

  // used only when mode is set to true
  // false => filter by all effects (combine 2 ingredients)
  // true => filter by at least one effect (combine 3 ingredients)
  const [combine, setCombine] = useState(false);

  // used to store effects or ingredients
  const [filter, setFilter] = useState<string[]>([]);

  // reset the filter when changing the mode
  useEffect(() => {
    setFilter([]);
  }, [mode]);

  // data from json file
  const { effects, ingredients } = data;

  return (
    <>
      <Head>
        <title>Alchemy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="max-w-screen-xl mx-auto pt-6">
        <h1 className="text-2xl font-medium">Skyrim - Alchemy minigame</h1>
        <section>
          <div>
            <label htmlFor="mode">Filter by effects/ingredients</label>
            <input type="checkbox" id="mode" checked={mode} onChange={() => setMode((m) => !m)} />
          </div>
          {mode && (
            <div>
              <label htmlFor="combine">Combine more than 2</label>
              <input type="checkbox" id="combine" checked={combine} onChange={() => setCombine((m) => !m)} />
            </div>
          )}
        </section>
      </header>
      <main className="my-6 max-w-screen-xl mx-auto px-4 xl:px-0 grid grid-cols-2 gap-6">
        <section className="grid grid-cols-2 gap-2 max-h-0">
          {effects.map((effect) =>
            filter.includes(effect) ? (
              <div
                key={effect}
                className="select-none py-2 px-4 border-2 border-green-200 rounded-lg bg-green-100 hover:bg-green-200 text-green-500 hover:text-green-700 cursor-pointer"
                onClick={() => {
                  setFilter((f) => f.filter((e) => e !== effect));
                }}
              >
                {effect}
              </div>
            ) : (
              <div
                key={effect}
                className="select-none py-2 px-4 border-2 border-red-200 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => {
                  setFilter((f) => f.concat(effect));
                }}
              >
                {effect}
              </div>
            )
          )}
        </section>
        <section className="grid grid-cols-3 gap-16">
          {filter.length === 0 && ingredients.map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} className="w-full" />)}
          {combine && filter.length > 0 && ingredients.filter((ingredient) => filter.some((e) => ingredient.effects.includes(e))).map((ingredient, i) => <Ingredient ingredient={ingredient} filter={filter} key={i} />)}
          {!combine && filter.length > 0 && ingredients.filter((ingredient) => filter.every((e) => ingredient.effects.includes(e))).map((ingredient, i) => <Ingredient ingredient={ingredient} filter={filter} key={i} />)}
        </section>
      </main>
    </>
  );
};

export default Home;
