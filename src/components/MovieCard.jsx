import React from 'react';

const MovieCard = ({ movie }) => {
  const { Title, Year, imdbID, Poster, Type } = movie;

  return (
    <div className="movie-card" key={imdbID}>
      <a href={`https://www.omdb.com/title/${imdbID}`} target="_blank" rel="noopener noreferrer">
        <img
          src={Poster !== "N/A" ? Poster : '/no-movie.png'}
          alt={Title}
        />
      </a>

      <div className="mt-4">
        <h3>{Title}</h3>

        <div className="content">
          <p className="lang">Type: {Type}</p>
          <span>•</span>
          <p className="year">{Year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
