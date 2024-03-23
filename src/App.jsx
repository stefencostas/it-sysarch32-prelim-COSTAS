import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokedex from './Pokedex';
import './App.css';

const fetchPokemonData = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  return Promise.all(
    data.results.map(async (pokemon, index) => {
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
      const pokemonData = await pokemonResponse.json();
      const langResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index + 1}`);
      const langData = await langResponse.json();

      const name = {
        en: langData.names.find(name => name.language.name === 'en').name,
        ja: langData.names.find(name => name.language.name === 'ja').name,
        zh: langData.names.find(name => name.language.name === 'zh-Hant').name,
        fr: langData.names.find(name => name.language.name === 'fr').name,
      };

      return {
        id: pokemonData.id,
        name,
        image: pokemonData.sprites.front_default,
        types: pokemonData.types,
        stats: pokemonData.stats,
      };
    })
  );
};

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemonData().then((data) => {
      setPokemonList(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <Pokedex pokemonList={pokemonList} isLoading={isLoading} />
    </>
  );
}

export default App;