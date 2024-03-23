import React from 'react';

const Pokemon = ({ pokemon, language }) => {
  const { id, name, image, type } = pokemon;

  const getName = () => {
    switch (language) {
      case 'en':
        return name.english;
      case 'ja':
        return name.japanese;
      case 'zh':
        return name.chinese;
      case 'fr':
        return name.french;
      default:
        return name.english; // Fallback to English
    }
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <h1 className="pokemon-id">#{id}</h1>
        <img src={image} alt={getName()} className="pokemon-image" />
        <h2 className="pokemon-name">{getName()}</h2>
      </div>
    </div>
  );
};

export default Pokemon;
