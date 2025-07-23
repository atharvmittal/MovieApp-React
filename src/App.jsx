import React, { useEffect, useState } from 'react'
import Spinner from './components/spinner';
import Search from './Components/search'
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState(''); // no default search now
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (searchQuery) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&type=movie`;
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'No movies found');
        setMovies([]);
        return;
      }

      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() !== '') {
      fetchMovies(query);
    }
  }, [query]);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Hassle</h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={() => setQuery(searchTerm)}
          />
        </header>
        <section className='all-movies'>
          <h2 className="mt-[40px]">All Movies</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : movies.length > 0 ? (
            <ul>
              {movies.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          ) : (
            <p className="text-white">No movies to display. Please search for a movie.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
