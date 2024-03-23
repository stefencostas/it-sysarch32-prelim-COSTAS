import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchPokemonData = async (page) => {
      try {
        const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${page}`);
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };

    const fetchAllPokemonData = async () => {
      try {
        setIsLoading(true);
        const allPokemonData = [];
        for (let page = 1; page <= 15; page++) {
          const pokemonData = await fetchPokemonData(page);
          allPokemonData.push(...pokemonData);
        }
        setPokemonList(allPokemonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllPokemonData();
  }, []);

  const goToPage = async (page) => {
    setLoadingPage(true);
    setCurrentPage(page);
    setLoadingPage(false);
  };

  const goToNextPage = async () => {
    if (currentPage < 15) {
      await goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = async () => {
    if (currentPage > 1) {
      await goToPage(currentPage - 1);
    }
  };

  return (
    <div className="pokedex">
      <div className="pokedex-header">
        <div>
          <button onClick={() => { setLanguage('en'); console.log('Language:', language); }}>English</button>
          <button onClick={() => { setLanguage('ja'); console.log('Language:', language); }}>Japanese</button>
          <button onClick={() => { setLanguage('zh'); console.log('Language:', language); }}>Chinese</button>
          <button onClick={() => { setLanguage('fr'); console.log('Language:', language); }}>French</button>
        </div>
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1 || loadingPage}>Back</button>
          {[...Array(15).keys()].map((page) => (
            <button key={page + 1} onClick={() => goToPage(page + 1)} disabled={page + 1 === currentPage || loadingPage}>
              {page + 1}
            </button>
          ))}
          <button onClick={goToNextPage} disabled={currentPage === 15 || loadingPage}>Next</button>
        </div>
      </div>
      <div className="pokemon-list">
        {loadingPage ? (
          <div>Loading Pokémon...</div>
        ) : (
          pokemonList
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
            ))
        )}
      </div>
    </div>
  );
};

export default Pokedex;
