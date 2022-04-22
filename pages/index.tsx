import type { NextPage } from "next";
import Head from "next/head";
import data from "../resources/alchemy.json";
import { useState, useEffect } from "react";
import Ingredient from "../components/Ingredient";
import FilterWrapper from "../components/FilterWrapper";
import Effect from "../components/Effect";

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

  // function used to modify the filter
  const modify = (id: string, active: boolean): void => {
    // check if the item is currently filtered
    if (active) {
      // remove item from the filter
      setFilter((f) => f.filter((i) => i !== id));
    } else {
      // add item to the filter
      setFilter((f) => f.concat(id));
    }
  };

  return (
    <>
      <Head>
        <title>Alchemy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="max-w-screen-xl mx-auto px-4 xl:px-0 pt-6">
        <h1 className="text-2xl font-medium">Skyrim - Alchemy minigame</h1>
        <section className="mt-3 flex gap-4 flex-wrap">
          <div className="block">
            <span className="text-gray-700 text-lg">Filter by</span>
            <div className="mt-1">
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="radio" className="form-radio" name="mode" checked={mode} onChange={() => setMode(true)} />
                  <span className="ml-2">Effects</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="radio" className="form-radio" name="mode" checked={!mode} onChange={() => setMode(false)} />
                  <span className="ml-2">Ingredients</span>
                </label>
              </div>
            </div>
          </div>
          {/* show only when filtering by effects */}
          {mode && (
            <div className="block">
              <span className="text-gray-700 text-lg">Combine</span>
              <div className="mt-1">
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" className="form-radio" name="combine" checked={!combine} onChange={() => setCombine(false)} />
                    <span className="ml-2">2 ingredients</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" className="form-radio" name="combine" checked={combine} onChange={() => setCombine(true)} />
                    <span className="ml-2">3 ingredients</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </section>
      </header>
      {/* container which contains two sections - effects on the left, ingredients on the right */}
      <main className="my-6 max-w-screen-xl mx-auto px-4 xl:px-0 grid grid-cols-2 gap-6">
        <section className="grid sm:grid-cols-2 gap-2 max-h-0">
          {effects.map((effect) =>
            mode ? (
              // display all effects and add FilterWrapper when filtering by effects
              <FilterWrapper key={effect} id={effect} active={filter.includes(effect)} modify={modify}>
                <Effect effect={effect} />
              </FilterWrapper>
            ) : (
              // add filter attribute to highlight effects that we can get from currently filtered ingredients
              <Effect key={effect} effect={effect} filter={filter} />
            )
          )}
        </section>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            // display only filtered ingredients when filtering by effects
            mode &&
              (filter.length === 0
                ? // display all when no filters are applied
                  ingredients.map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} />)
                : // use every() when combining 2, use some() when combining 3
                  ingredients.filter((ingredient) => (combine ? filter.some((e) => ingredient.effects.includes(e)) : filter.every((e) => ingredient.effects.includes(e)))).map((ingredient, i) => <Ingredient ingredient={ingredient} filter={filter} key={i} />))
          }
          {
            // display all ingredients and add FilterWrapper when filtering by ingredients
            !mode &&
              ingredients.map((ingredient) => (
                <FilterWrapper key={ingredient.name} id={ingredient.name} active={filter.includes(ingredient.name)} modify={modify}>
                  <Ingredient ingredient={ingredient} />
                </FilterWrapper>
              ))
          }
        </section>
      </main>
    </>
  );
};

export default Home;
