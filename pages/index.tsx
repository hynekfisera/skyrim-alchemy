import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import data from "../resources/alchemy.json";
import { useState, useEffect, SyntheticEvent } from "react";
import Ingredient from "../components/Ingredient";

const Home: NextPage = () => {
  const [filter, setFilter] = useState("all");

  const { effects, ingredients } = data;

  return (
    <>
      <Head>
        <title>Alchemy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-6">
        <h1 className="text-xl font-medium">Skyrim - Alchemy minigame</h1>
        <section className="my-4">
          <select value={filter} onChange={(e: SyntheticEvent<HTMLSelectElement>) => setFilter((e.target as HTMLSelectElement).value)}>
            <option value="all">All Effects</option>
            {effects.map((effect) => (
              <option key={effect} value={effect}>
                {effect}
              </option>
            ))}
          </select>
        </section>
        <section className="grid grid-cols-6 gap-16">
          {filter === "all" && ingredients.map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} className="w-full" />)}
          {filter !== "all" && ingredients.filter((ingredient) => ingredient.effects.includes(filter)).map((ingredient, i) => <Ingredient ingredient={ingredient} key={i} />)}
        </section>
      </main>
    </>
  );
};

export default Home;
